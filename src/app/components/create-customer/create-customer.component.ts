import { Component,inject, input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent implements OnInit{
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  id:any;
  isEdit:boolean=false;
  private userService=inject(UsersService);

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    })
  });

  ngOnInit(): void {
    let formData;
    this.route.paramMap.subscribe(params=>{
      this.id=params.get('id');
      this.isEdit=params.get('id')?true:false;
      const storedUserData=localStorage.getItem('MyUsersData');
      let parsedData=storedUserData?JSON.parse(storedUserData):null;
      formData=parsedData.find((user: { id: any})=>user.id==params.get('id'));
      if(this.isEdit && formData){
        this.userForm.setValue({
          username:formData.username,
          email:formData.email,
          name:formData.name,
          address:{
            street:formData.address.street,
            city:formData.address.city
          }
        })
      }
    });

 
  }

  onSubmit() {
    this.userService.storeUsers({...this.userForm.value,id:this.id?this.id:Math.random()},this.isEdit);
    this.userForm.reset();
    this.router.navigate(['/userDashboard'])
  }
  onCancelUser(){
    this.userForm.reset();
  }
}
