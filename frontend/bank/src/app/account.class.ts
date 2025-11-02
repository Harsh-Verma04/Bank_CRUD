export class Account {
    id: number = 0;
    accountHolderName: string = '';
    balance: number = 0.0;
  
    constructor(id?: number, accountHolderName?: string, balance?: number) {
      this.id = id || 0;
      this.accountHolderName = accountHolderName || '';
      this.balance = balance || 0.0;
    }
  }
  