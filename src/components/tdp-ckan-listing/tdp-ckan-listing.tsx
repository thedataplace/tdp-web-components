import { Component, h, State, Event, EventEmitter, Prop } from '@stencil/core';
import { TDPManager } from '../../config/tdp';
import { CKANAction } from '../../api/ckan.model';
import { CKAN } from '../../api/ckan.service';

export type TDPCKANListingType =
  'package' | 'organization' | 'group'
  ;

@Component({
  tag: 'tdp-ckan-listing',
  styleUrl: 'tdp-ckan-listing.scss',
  shadow: true
})
export class TDPCKANListing {

  /** The compatible listing type */
  @Prop() type: TDPCKANListingType;

  /** Emitted when a user selects a new item from the list */
  @Event({ bubbles: true }) public itemSelected: EventEmitter;

  @State() private items = [];

  private _client: CKAN;

  componentDidLoad() {
    TDPManager
      .instance()
      .getClient().then(client => {
        this._client = client;
        this.update();
      });
  }

  protected async update() {
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

  render() {
    return (
      <div>
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
