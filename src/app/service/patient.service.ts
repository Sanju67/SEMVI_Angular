import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../class/patient';
import { Login } from '../class/login'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) { }

  getPatients() : Observable<object>{
    // accept httpClient
    // import httpCLient in app.module.ts
    return this.http.get("http://localhost:8080/allPatient"); 
  }

  addPatient(patient : Patient) : Observable<object>{
      return this.http.post("http://localhost:8080/addPatient",patient);
  }

  loginUser(login : Login) : Observable<string>{
    console.log("Inside patient service") ;
    let returnedString = this.http.post("http://localhost:8080/loginValid",login,{ responseType: 'text' }) ;
    console.log("String got from http post : " , returnedString) ;
    return returnedString;
  }
}
