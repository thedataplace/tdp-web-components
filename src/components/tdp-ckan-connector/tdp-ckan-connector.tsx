import { Component, h, Prop, Host, State, Watch } from '@stencil/core';
import { CKAN } from '../../api/ckan.service';
import { TDPManager } from '../../config/tdp';

@Component({
  tag: 'tdp-ckan-connector'
})
export class TdpCkanConnector {

  /** the url to the CKAN site */
  @Prop() site: string;

  @State() client: CKAN;

  // Lifecycle
  //

  componentWillLoad() {
    this.setClient();
  }

  // Watchers
  //

  @Watch('site')
  onSiteChanged() {
    this.setClient()
  }

  // Internal
  //

  private setClient() {
    if (!this.client) {
      this.client = new CKAN(this.site);
    } else {
      this.client.baseUrl = this.site;
    }

    TDPManager
      .instance()
      .setClient(this.client)
      .then(() => console.log('TdpCkanConnector -> client ready'))
      .catch(error => console.error(error));
  }

  // Rendering
  //

  render() {
    return (
      <Host></Host>
    );
  }
}
