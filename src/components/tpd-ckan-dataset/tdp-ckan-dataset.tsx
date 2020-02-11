import { Component, h, Prop, Watch, State } from '@stencil/core';
import { parseJSON, format } from 'date-fns';
import { ICKANDataset } from '../../api/ckan.model';
import { TDPManager } from '../../config/tdp';
import { CKAN } from '../../api/ckan.service';
import { isEmail } from '../../utils/regex';

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
    this.update();
  }

  // Internal
  //

  private async init() {
    await TDPManager.instance().ready();
    this._client = await TDPManager.instance().getClient();

    this.update();
  }

  private async update() {
    const action = 'package_show';

    try {
      const response = await this._client.action(action, { id: this.datasetId })
      const result: ICKANDataset = response.result;

      this.dataset = result;
    } catch (error) {
      console.error(error);
      this.datasetId = undefined;
    }
  }

  private formatDate(date: string): string {
    return format(parseJSON(date), 'yyyy MMM do');
  }

  private formatEmail(value: string): string {
    if (!isEmail(value)) {
      return undefined;
    }

    if (value.indexOf('mailto:') > -1) {
      return value;
    }

    return `mailto:${value}`;
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
                <li class="cursor-pointer select-none p-2"><a href={resource.url} target="_blank" class="no-underline p-2 rounded">{resource.name}</a></li>
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
        <span class="value">{this.dataset.author}</span>
      );
    } else if (hasAuthor && hasAuthorEmail) {
      const email = this.formatEmail(this.dataset.author_email);

      inner.push(
        <a href={email} target="_blank">{this.dataset.author}</a>
      );
    } else if (!hasAuthor && hasAuthorEmail) {
      const email = this.formatEmail(this.dataset.author_email);

      inner.push(
        <a href={email} target="_blank">{this.dataset.author_email}</a>
      );
    }

    return (
      <div class="table-row">
        <div class="table-cell">
          <span class="label">Author</span>
        </div>
        <div class="table-cell pl-2">
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
        <span class="value">{this.dataset.maintainer}</span>
      );
    } else if (hasMaintainer && hasMaintainerEmail) {
      const email = this.formatEmail(this.dataset.maintainer_email);

      inner.push(
        <a href={email} target="_blank">{this.dataset.maintainer}</a>
      );
    } else if (!hasMaintainer && hasMaintainerEmail) {
      const email = this.formatEmail(this.dataset.maintainer_email);

      inner.push(
        <a href={email} target="_blank">{this.dataset.maintainer_email}</a>
      );
    }

    return (
      <div class="table-row">
        <div class="table-cell">
          <span class="label">Maintainer</span>
        </div>
        <div class="table-cell pl-2">
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
            <span class="label">Created</span>
          </div>
          <div class="table-cell pl-2">
            <span class="value">{this.formatDate(this.dataset.metadata_created)}</span>
          </div>
        </div>
      )
      : undefined;

    const modified = !!hasLastModified
      ? (
        <div class="table-row">
          <div class="table-cell">
            <span class="label">Last Modified</span>
          </div>
          <div class="table-cell pl-2">
            <span class="value">{this.formatDate(this.dataset.metadata_modified)}</span>
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
      <div class="container md:flex p-6 bg-white shadow-lg rounded-lg">
        <div class="w-full md:w-1/2 md:m-3">
          {this.title()}
          {this.notes()}
        </div>
        <div class="w-full md:w-1/2 md:m-3">
          {this.resources()}
          <div class="metadata table-auto border-solid border-1 border-gray-200 p-2">
            {this.author()}
            {this.maintainer()}
            {this.metadata()}
          </div>
        </div>
      </div >
    )
  }
}
