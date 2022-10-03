export class HelloContract {
  constructor({contractId, walletToUse}) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getMessage() {
    return await this.wallet.viewMethod({contractId: this.contractId, method: 'get_message'});
  }
}
