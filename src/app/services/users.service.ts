import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class UsersService{
  private http=inject(HttpClient);
  users=[];

  getUsers(){
     this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
      next:(value:[])=>{this.users=value},
      error:(error)=>this.users=[]
    })
    return this.users;
  }

  storeUsers(newUserData,isEdit){
    const storedUserData=localStorage.getItem('MyUsersData');
    let parsedData=storedUserData?JSON.parse(storedUserData):null;
    if(isEdit){
      let notEditedData=parsedData.filter(ele=>ele.id!=newUserData.id);
      if(notEditedData){
        this.users=[newUserData,...notEditedData];
      }
    }else{
      this.users=newUserData?[newUserData,...this.users]:this.users;
    }
    localStorage.setItem('MyUsersData',JSON.stringify(this.users));
  }

}