import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-delete',
  imports: [FormsModule,CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  accountId: number = 0;  // Account ID to delete
  deletionMessage: string = '';  // Message to display after deletion

  constructor(private accountService: TransactionService) {}
  onDelete() {
    if (this.accountId) {
      this.accountService.deleteAccount(this.accountId).subscribe(
        (response: string) => {
          this.deletionMessage = response;
          alert(response);  
        },
        (error) => {
          console.error('Error deleting account:', error);
          alert('Successfully Deleted');
        }
      );
    } else {
      alert('Please provide a valid account ID.');
    }
  }
}
