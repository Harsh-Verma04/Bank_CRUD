import { Component } from '@angular/core';
import { AccountDto } from '../account-dto';
import { TransactionService } from '../transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deposit',
  imports: [FormsModule,CommonModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  accountId: number = 0;
  depositAmount: number = 0;
  updatedAccount: AccountDto | null = null;

  constructor(private accountService: TransactionService) {}

  onDeposit() {
    // Call depositAmount method in AccountService
    if (this.accountId && this.depositAmount > 0) {
      this.accountService.depositAmount(this.accountId, this.depositAmount).subscribe(
        (account: AccountDto) => {
          this.updatedAccount = account;  
          alert(`Amount deposited successfully.`);
        },
        (error) => {
          console.error('Error depositing amount', error);
          alert('Failed to deposit amount. Please try again.');
        }
      );
    } else {
      alert('Please provide a valid account ID and amount.');
    }
  }
}
