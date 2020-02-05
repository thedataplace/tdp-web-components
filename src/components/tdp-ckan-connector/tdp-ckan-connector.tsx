import { Component, h, Prop, Host, State } from '@stencil/core';
import { CKAN } from '../../api/ckan.service';
import { TDPManager } from '../../config/tdp';

@Component({
  tag: 'tdp-ckan-connector'
})
export class TdpCkanConnector {

  @Prop() site: string;
  @Prop() apiKey: string;

  @State() client: CKAN;

  componentDidLoad() {
    TDPManager
      .instance()
      .setClient(new CKAN(this.site, this.apiKey))
      .then(client => {
        this.client = client;
        console.log('TdpCkanConnector -> client ready');
      });
  }

  render() {
    return (
      <Host></Host>
    );
  }
}
