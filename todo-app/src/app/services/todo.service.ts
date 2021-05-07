import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TodoModel } from '../todo.model';
import { UserModel } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUri : string = "http://localhost:8880/todo";

  constructor(private http : HttpClient) {

   }

  addTodo(todo : TodoModel) {
    let user = JSON.parse(localStorage.getItem('user'));
    this.http.post(this.baseUri + "/" + user.userid ,todo).subscribe(data => data = todo);
  }

  todoById(id : number)  :Observable<TodoModel>{
    return this.http.get<TodoModel>(this.baseUri + "/" +id);
  }

  async todoByUser(){
    let user : UserModel;
    user = JSON.parse(localStorage.getItem('user'));
    return await this.http.get<TodoModel[]>(this.baseUri + "/user/" + user.userid).pipe(delay(100)).toPromise();

  }

  async delTodo(index :number){
    //console.log("****"+index)
      return await this.http.delete(this.baseUri+"/delete/"+index).toPromise();
  }

}
