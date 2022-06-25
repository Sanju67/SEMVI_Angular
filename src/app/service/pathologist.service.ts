import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pathologist } from '../class/pathologist';
import { Login } from '../class/login'
@Injectable({
  providedIn: 'root'
})
export class PathologistService {

  constructor(private http : HttpClient) { }

  addPathologist(pathologist : Pathologist) : Observable<object>{
    return this.http.post("http://localhost:8080/addPathologist",pathologist);
}

loginUser(login : Login) : Observable<string>{
  console.log("Inside patient service") ;
  let returnedString = this.http.post("http://localhost:8080/loginPatho",login,{ responseType: 'text' }) ;
  console.log("String got from http post : " , returnedString) ;
  return returnedString;
}
}
