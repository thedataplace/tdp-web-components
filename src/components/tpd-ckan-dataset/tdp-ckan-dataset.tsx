import { Component, h, Prop, Watch, State } from '@stencil/core';
import { ICKANDataset } from '../../api/ckan.model';
import { TDPManager } from '../../config/tdp';
import { CKAN } from '../../api/ckan.service';


@Component({
  tag: 'tdp-ckan-dataset',
  styleUrl: 'tdp-ckan-dataset.scss',
  shadow: true
})
export class TdpCkanDataset {

  /** The ID of the CKAN dataset */
  @Prop() public datasetId: string;

  @State() private dataset: ICKANDataset;

  private _client: CKAN;

  componentDidLoad() {
    TDPManager
      .instance()
      .getClient()
      .then(client => this._client = client);
  }

  @Watch('datasetId')
  protected async onDatasetIdChange() {
    try {
      const response = await this._client.action('package_show', { id: this.datasetId })
      const result: ICKANDataset = response.result;

      this.dataset = result;
    } catch (error) {
      this.datasetId = undefined;
    }
  }

  private title() {
    return (
      <h1>{this.dataset ? this.dataset.title : 'Not defined'}</h1>
    );
  }

  private author() {
    return (
      <p>Author: {this.dataset ? this.dataset.author : 'Not defined'}</p>
    );
  }

  private resources() {
    if (!(this.dataset && this.dataset.resources)) {
      return undefined;
    }

    return [
      <h2>Resources</h2>,
      <ul>
        {
          this.dataset.resources.map(resource =>
            <li><a href={resource.url} target="_blank">{resource.name}</a></li>
          )
        }
      </ul>
    ];
  }

  render() {
    return [
      this.title(),
      this.author(),
      this.resources()
    ]
  }
}
