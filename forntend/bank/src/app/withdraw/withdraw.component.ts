import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountDto } from '../account-dto';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-withdraw',
  imports: [FormsModule,CommonModule],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent {
  accountId: number = 0;  // Account ID to withdraw from
  withdrawAmount: number = 0;  // Amount to withdraw
  updatedAccount: AccountDto | null = null;  // Updated account after withdrawal

  constructor(private accountService: TransactionService) {}

  // Method to handle withdrawal
  onWithdraw() {
    if (this.accountId && this.withdrawAmount > 0) {
      this.accountService.withdrawAmount(this.accountId, this.withdrawAmount).subscribe(
        (account: AccountDto) => {
          this.updatedAccount = account;
          alert(`Amount withdrawn successfully.`);
        },
        (error) => {
          console.error('Error withdrawing amount', error);
          alert('Failed to withdraw amount. Please try again.');
        }
      );
    } else {
      alert('Please provide a valid account ID and amount.');
    }
  }
}
