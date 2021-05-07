import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { TodoModel } from '../todo.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  todo : TodoModel;
  priority : string[];
  category : string[];
  status : string[];

  constructor(private service : TodoService, private router : Router) { 
    this.todo = new TodoModel();
    this.category = ["personal","official","family","gang"];
    this.priority = ["High", "Normal", "Low", "Urgent"];
    this.status = ["Due", "Done", "Ignore", "Missed"];
  }

  ngOnInit(): void {
    if(localStorage.getItem("user") == null)
      this.router.navigate(['login']);
  }

  saveTodo() {
    this.service.addTodo(this.todo);
    this.router.navigate(['list']);
  }
  
}
