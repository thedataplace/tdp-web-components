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

  // Lifecycle
  //

  componentDidLoad() {
    TDPManager
      .instance()
      .getClient()
      .then(client => this._client = client);
  }

  // Watchers
  //

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

  // Rendering
  //

  private title() {
    const hasTitle = this.dataset && this.dataset.title;

    return (
      hasTitle
        ? <section class="title"><h2>{this.dataset.title}</h2></section>
        : undefined
    );
  }

  private author() {
    const hasAuthor = this.dataset && this.dataset.author;

    return (
      hasAuthor
        ? <section class="author"><p>Author: {this.dataset.author}</p></section>
        : undefined
    );
  }

  private resources() {
    const hasResources = this.dataset && this.dataset.resources;

    return hasResources
      ? (
        <section class="resources">
          <h2 class="leading-tight">Resources</h2>
          <ul class="list-none p-0">
            {
              this.dataset.resources.map(resource =>
                <li><a href={resource.url} target="_blank" class="no-underline">{resource.name}</a></li>
              )
            }
          </ul>
        </section>
      )
      : undefined;
  }

  render() {
    return (
      <div class="container flex flex-col p-6 bg-white shadow-lg rounded-lg">
        {this.title()}
        {this.author()}
        {this.resources()}
      </div>
    )
  }
}
