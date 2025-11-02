export class AccountDto {
    id: number;
    accountHolderName: string;
    balance: number;
  
    constructor(id: number, accountHolderName: string, balance: number) {
      this.id = id;
      this.accountHolderName = accountHolderName;
      this.balance = balance;
    }
  }
  