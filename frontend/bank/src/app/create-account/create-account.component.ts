import { Component } from '@angular/core';
import { Account } from '../account.class';
import { TransactionService } from '../transaction.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-create-account',
  imports: [FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  account: Account = new Account(); // Bind form data

  constructor(private accountService: TransactionService) {}

  // Function to handle form submission
  onSubmit() {
    this.accountService.createAccount(this.account).subscribe(
      (data) => {
        console.log('Account Created:', data);
        alert('Account successfully created!');
        this.account = new Account(); // Reset form after success
      },
      (error) => {
        console.error('Error creating account:', error);
      }
    );
  }
}

