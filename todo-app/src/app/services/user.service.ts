import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../login.model';
import { UserModel } from '../user.model';
import { catchError, delay, retry } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user : UserModel;

  private baseUri : string = "http://localhost:8880";


  constructor(private http : HttpClient, private router : Router) {
   }

   async validateLogin(email :string, passwd:string){
    // console.log(auth.email+"  "+auth.passwd);
     return await this.http.get<UserModel>(this.baseUri+"/auth?email="+email+"&passwd="+passwd)
     .pipe(retry(1),catchError(this.handleError)).toPromise();
   }
 
   createUser(user : UserModel){
     this.http.post(this.baseUri+"/user",user).subscribe(data=>data=this.user);
   }
 
   handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // client-side error
       errorMessage = `Error: ${error.error.message}`;
     } else {
       // server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
   }
  
   logout() {
     localStorage.removeItem("user");
     this.router.navigate(['login']);
   }
}
