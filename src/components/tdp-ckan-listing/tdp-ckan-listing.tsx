import { Component, h, State, Event, EventEmitter, Prop } from '@stencil/core';
import { TDPManager } from '../../config/tdp';
import { CKANAction } from '../../api/ckan.model';
import { CKAN } from '../../api/ckan.service';

export type TdpCkanListingType =
  'package' | 'organization' | 'group'
  ;

@Component({
  tag: 'tdp-ckan-listing',
  styleUrl: 'tdp-ckan-listing.scss',
  shadow: true
})
export class TdpCkanListing {

  /** The compatible listing type */
  @Prop() type: TdpCkanListingType;

  /** Emitted when a user selects a new item from the list */
  @Event({ bubbles: true }) public itemSelected: EventEmitter;

  @State() private items = [];

  private _client: CKAN;

  // Lifecycle
  //

  componentDidLoad() {
    TDPManager
      .instance()
      .getClient().then(client => {
        this._client = client;
        this.update();
      });
  }

  //  Internal
  //

  private async update() {
    const action = `${this.type}_list` as CKANAction;

    try {
      const response = await this._client.action(action);
      const result: string[] = response.result;

      this.items = [...result as any];
    } catch (error) {
      this.items = ['Error loading data'];
    }
  }

  private onItemClick(event: any) {
    this.itemSelected.emit(event);
  }

  // Rendering
  //

  private defaultHeader() {
    switch (this.type) {
      case 'group':
        return 'Groups';
      case 'organization':
        return 'Organisations';
      case 'package':
        return 'Datasets';
    }
  }

  render() {
    return (
      <div>
        <slot name="header">
          <h1>{this.defaultHeader()}</h1>
        </slot>
        <ul>
          {
            this.items.map(item =>
              <li>
                <div onClick={() => this.onItemClick(item)}>{item}</div>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}
