import { Component, h, Prop, Watch, State } from '@stencil/core';
import { parseJSON, format } from 'date-fns';
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
    this.init();
  }

  // Watchers
  //

  @Watch('datasetId')
  protected async onDatasetIdChange() {
    try {
      const response = await this._client.action('package_show', { id: this.datasetId })
      const result: ICKANDataset = response.result;

      this.dataset = result;

      console.log(this.dataset);
    } catch (error) {
      console.error(error);
      this.datasetId = undefined;
    }
  }

  // Internal
  //

  private async init() {
    await TDPManager.instance().ready();
    this._client = await TDPManager.instance().getClient();
  }

  private formatDate(date: string): string {
    return format(parseJSON(date), 'yyyy MMM do');
  }

  // Rendering
  //

  private title() {
    const hasTitle = !!this.dataset.title;

    if (!hasTitle) {
      return undefined;
    }

    return (<section class="title"><h2>{this.dataset.title}</h2></section>);
  }

  private notes() {
    const hasNotes = !!this.dataset.notes;

    if (!hasNotes) {
      return undefined;
    }

    return (<section class="notes"><p>{this.dataset.notes}</p></section>);
  }

  private resources() {
    const hasResources = !!this.dataset.resources;

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

  private author() {
    const hasAuthor = !!this.dataset.author;
    const hasAuthorEmail = !!this.dataset.author_email;

    if (!hasAuthor && !hasAuthorEmail) {
      return undefined;
    }

    let inner: any[] = [];

    if (hasAuthor && !hasAuthorEmail) {
      inner.push(
        <p>{this.dataset.author}</p>
      );
    } else if (hasAuthor && hasAuthorEmail) {
      inner.push(
        <a href={this.dataset.author_email}>{this.dataset.author}</a>
      );
    } else if (!hasAuthor && hasAuthorEmail) {
      inner.push(
        <a href={this.dataset.author_email}>{this.dataset.author}</a>
      );
    }

    return (
      <div class="table-row">
        <div class="table-cell">
          <span>Author</span>
        </div>
        <div class="table-cell">
          {inner}
        </div>
      </div>
    );
  }

  private maintainer() {
    const hasMaintainer = !!this.dataset.maintainer;
    const hasMaintainerEmail = !!this.dataset.maintainer_email;

    if (!hasMaintainer && !hasMaintainerEmail) {
      return undefined;
    }

    let inner: any[] = [];

    if (hasMaintainer && !hasMaintainerEmail) {
      inner.push(
        <p>{this.dataset.maintainer}</p>
      );
    } else if (hasMaintainer && hasMaintainerEmail) {
      inner.push(
        <a href={this.dataset.maintainer_email}>{this.dataset.maintainer}</a>
      );
    } else if (!hasMaintainer && hasMaintainerEmail) {
      inner.push(
        <a href={this.dataset.maintainer_email}>{this.dataset.maintainer}</a>
      );
    }

    return (
      <div class="table-row">
        <div class="table-cell">
          <span>Maintainer</span>
        </div>
        <div class="table-cell">
          {inner}
        </div>
      </div>
    );
  }



  private metadata() {
    const hasCreated = !!this.dataset.metadata_created;
    const hasLastModified = !!this.dataset.metadata_modified;

    if (!hasCreated && !hasLastModified) {
      return undefined;
    }

    const created = !!hasCreated
      ? (
        <div class="table-row">
          <div class="table-cell">
            <span>Created</span>
          </div>
          <div class="table-cell">
            {this.formatDate(this.dataset.metadata_created)}
          </div>
        </div>
      )
      : undefined;

    const modified = !!hasLastModified
      ? (
        <div class="table-row">
          <div class="table-cell">
            <span>Last Modified</span>
          </div>
          <div class="table-cell">
            {this.formatDate(this.dataset.metadata_modified)}
          </div>
        </div>
      )
      : undefined;

    return [
      created,
      modified
    ];
  }

  render() {
    if (!this.dataset) {
      return undefined;
    }

    return (
      <div class="container flex flex-wrap p-6 bg-white shadow-lg rounded-lg">
        <div class="w-full sm:w-1/2">
          {this.title()}
          {this.notes()}
        </div>
        <div class="w-full sm:w-1/2">
          {this.resources()}
          <div class="table-auto">
            {this.author()}
            {this.maintainer()}
            {this.metadata()}
          </div>
        </div>
      </div>
    )
  }
}
