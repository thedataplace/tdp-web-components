import { ICKANResponse, CKANAction } from './ckan.model';

export class CKAN {

  constructor(
    public readonly baseUrl: string,
    public readonly apiKey?: string
  ) {

  }

  // Public
  //

  public async action(command: CKANAction, data?: any) {
    return this.request(`${this.apiUrl}action/${command}`, data);
  }

  public async ping() {
    return this.request('site_read');
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
      throw new Error('CKANError: no baseUrl set!');
    }

    const headers = new Headers();

    if (!!this.apiKey) {
      headers.append('X-CKAN-API-Key', this.apiKey);
    }

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

  private onError(response: Response) {
    throw new Error(`CKAN Error: ${response.status}, ${response.statusText}`);
  }
}
