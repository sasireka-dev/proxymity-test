import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  private userService=inject(UsersService);
  private router=inject(Router);
  users=[];
  ngOnInit(): void {
  this.users=this.userService.getUsers();
  }

  deleteUser(userId:number){
   this.users=this.users.filter(ele=>ele.id !== userId);
   localStorage.setItem('MyUsersData',JSON.stringify(this.users));
  }
  editUserData(userId:number){
    this.router.navigate(['/edit',userId]);
  }
}
