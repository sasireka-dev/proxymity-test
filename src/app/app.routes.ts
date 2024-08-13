import { Routes } from '@angular/router';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'',component:CreateCustomerComponent},
    {path:'edit/:id',component:CreateCustomerComponent},
    {path:'userDashboard',component:DashboardComponent}
];
