import { Component } from '@angular/core';
import { Account } from '../account.class';
import { TransactionService } from '../transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-list',
  imports: [CommonModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent {
  accounts: Account[] = []; // Store fetched accounts

  constructor(private accountService: TransactionService) {}

  ngOnInit(): void {
    this.getAccounts(); // Fetch accounts on component load
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe(
      (data) => {
        this.accounts = data;
        console.log('Fetched Accounts:', this.accounts);
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }
}

