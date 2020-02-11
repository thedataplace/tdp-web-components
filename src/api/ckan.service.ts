import { ICKANResponse, CKANAction } from './ckan.model';

export class CKAN {

  constructor(private _baseUrl: string) { }

  // Public
  //

  public async action(command: CKANAction, data?: any) {
    return this.request(`${this.apiUrl}action/${command}`, data);
  }

  public async ping() {
    return this.action('site_read');
  }

  public set baseUrl(value: string) {
    // TODO: Url validation
    this._baseUrl = value;
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }

  public get apiUrl(): string {
    return `${this.baseUrl}/api/3/`;
  }

  // Internal
  //

  private toQueryString(obj: any) {
    return Object
      .keys(obj)
      .map(key => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }

  private async request(url: string, params: any = undefined, method: 'GET' = 'GET'): Promise<ICKANResponse> {
    if (!this.baseUrl) {
      this.onError({
        status: -1,
        statusText: 'CKANError: no baseUrl set!'
      });

      return;
    }

    const headers = new Headers();

    // TODO: Add any headers

    const options = {
      method,
      headers
    };

    if (!!params) {
      if (method === 'GET') {
        url += '?' + this.toQueryString(params);
      } else {
        options['body'] = JSON.stringify(params);
      }
    }

    const request = new Request(url, options);
    const response = await fetch(request);

    if (response.status !== 200 || !response.ok) {
      this.onError(response);
    }

    return response.json();
  }

  private onError(response: any) {
    throw new Error(`CKAN Error: ${response.status}, ${response.statusText}`);
  }
}
