import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pathologist } from '../class/pathologist';
import { Login } from '../class/login'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PathologistService {
  private url: string = `${environment.api_url}`;
  constructor(private http : HttpClient) { }

  addPathologist(pathologist : Pathologist) : Observable<object>{
    return this.http.post(this.url + "addPathologist",pathologist);
}

loginUser(login : Login) : Observable<string>{
  console.log("Inside patient service") ;
  let returnedString = this.http.post(this.url + "loginPatho",login,{ responseType: 'text' }) ;
  console.log("String got from http post : " , returnedString) ;
  return returnedString;
}
}
