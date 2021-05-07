import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
   user : UserModel;
  constructor(private service : UserService, private router : Router) { 
    this.user = new UserModel();
  }

  ngOnInit(): void {
  }

  saveUser(){
    this.service.createUser(this.user);
    this.router.navigate(['list']);
  }
}
