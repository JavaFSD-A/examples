import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../login.model';
import { UserService } from '../services/user.service';
import { UserModel } from '../user.model';
import {  } from "rxjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth : LoginModel;

  constructor(private service : UserService, private router : Router) {
    this.auth = new LoginModel();
   }

  ngOnInit(): void {
  }

  authentication(){
     
  let user : UserModel;
  
    this.service.validateLogin(this.auth.email, this.auth.passwd).then((result : UserModel) => {
      user = result;
  
    if(user != null){
       localStorage.setItem("user", JSON.stringify(user));
       this.router.navigate(['add']);
     }else
     alert("Login Failed");
    });
  }

}
