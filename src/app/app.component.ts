import { Component, OnInit,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UsersService } from './services/users.service';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,CreateCustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private userService=inject(UsersService);
  title = 'angular-dev-test';

  ngOnInit(): void {
  this.userService.getUsers();
  }
  onClick(){
  
  }
}
