import { Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DeleteComponent } from './delete/delete.component';

export const routes: Routes = [
    { path: '', redirectTo: '/accounts', pathMatch: 'full' }, // Default route
  { path: 'accounts', component: AccountListComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'delete', component: DeleteComponent } 
];
