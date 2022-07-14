import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../class/login';

@Injectable({
  providedIn: 'root'
})
export class ManagePasswordService {
  

  sendMail(login : Login): Observable<any> {
    console.log("send mail service call made !!!") ;
    console.log("Data sent is  : ",login.email)
    return this.http.post("http://localhost:3000/sendmail",login) ;
  }

  constructor(private http: HttpClient) {
 
  }
 
}
