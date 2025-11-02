import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account.class';
import { AccountDto } from './account-dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseUrl = 'http://localhost:8081/api/accounts'; // Base API URL

  constructor(private http: HttpClient) { }

  
  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, account);
  }

   // Method to deposit an amount into the account
   depositAmount(id: number, amount: number): Observable<AccountDto> {
    // Make POST request to the backend
    return this.http.post<AccountDto>(`${this.baseUrl}/${id}/deposit`, amount);
  }

   // Method to withdraw an amount from the account
   withdrawAmount(id: number, amount: number): Observable<AccountDto> {
    return this.http.post<AccountDto>(`${this.baseUrl}/${id}/withdraw`, amount);
  }

  deleteAccount(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }

}

