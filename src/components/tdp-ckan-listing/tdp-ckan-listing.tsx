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
    this.init();
  }

  //  Internal
  //

  private async init() {
    await TDPManager.instance().ready();
    this._client = await TDPManager.instance().getClient();
    this.update();
  }

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

  render() {
    let header: string = '';

    switch (this.type) {
      case 'group':
        header = 'Groups';
        break;
      case 'organization':
        header = 'Organisations';
        break;
      case 'package':
        header = 'Datasets';
        break;
    }

    return (
      <div class="container flex flex-col p-6 bg-white shadow-lg rounded-lg">
        <section>
          <slot name="header">
            <h2 class="leading-tight">{header}</h2>
          </slot>
        </section>
        <section>
          <ul class="list-none p-0">
            {
              this.items.map(item =>
                <li class="cursor-pointer select-none rounded">
                  <div class="p-2" onClick={() => this.onItemClick(item)}>{item}</div>
                </li>
              )
            }
          </ul>
        </section>
        <section>
          <slot name="footer"></slot>
        </section>
      </div>
    );
  }
}
