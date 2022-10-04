export class GifCollectionContract {
  constructor({contractId, walletToUse}) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getGifCount() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_gif_count',
    })
  }

  async getGifs() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_gifs',
    });
  }

  async addGif(link) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'add_gif',
      args: {'link': link},
    });
  }
}
