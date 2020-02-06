import { CKAN } from '../api/ckan.service';

export class TDPManager {
  private static _instance: TDPManager;
  private _client: CKAN;

  private _ready: Promise<any>;
  private readyResolver: Function;

  private constructor() {
    this.reset();
  }

  private reset() {
    this._client = null;
    this._ready = new Promise(resolve => (this.readyResolver = resolve));
  }

  // Public
  //

  public static instance() {
    return this._instance || (this._instance = new this());
  }

  public async setClient(c: CKAN) {
    if (!!this._client) {
      this.reset();
    }

    this._client = c;
    this.readyResolver();

    return this._client;
  }

  public async getClient() {
    return this._client;
  }

  public async ready() {
    return this._ready;
  }
}
