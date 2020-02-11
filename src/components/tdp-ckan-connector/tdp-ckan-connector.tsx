import { Component, Event, EventEmitter, h, Prop, Host, State, Watch } from '@stencil/core';
import { CKAN } from '../../api/ckan.service';
import { TDPManager } from '../../config/tdp';


@Component({
  tag: 'tdp-ckan-connector'
})
export class TdpCkanConnector {

  /** The url to the CKAN site */
  @Prop() site: string;

  /** Render basic component connection state info */
  @Prop() debug: boolean = false;

  /** Dispatched when a connection to a CKAN site is established */
  @Event() ready: EventEmitter

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

  private async setClient() {
    if (!this.client) {
      this.client = new CKAN(this.site);
    } else {
      this.client.baseUrl = this.site;
    }

    try {
      await TDPManager.instance().setClient(this.client)

      const c = await TDPManager.instance().getClient();
      await c.ping();
      this.ready.emit();

      console.log(`TDPCkanConnector: connected to ${this.site}`);
    } catch (error) {
      console.error(`TDPCkanConnector: `, error);
    }
  }

  // Rendering
  //

  render() {
    return (
      <Host>
        {!this.debug
          ? undefined
          : <div class="container bg-white shadow-lg rounded-lg p-2">
            <span>Api URL: {this.client.apiUrl}</span>
          </div>
        }
      </Host>
    );
  }
}
