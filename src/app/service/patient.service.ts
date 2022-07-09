import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../class/patient';
import { Login } from '../class/login'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private url: string = `${environment.api_url}`;

  constructor(private http : HttpClient) { }

  getPatients() : Observable<object>{
    // accept httpClient
    // import httpCLient in app.module.ts
    return this.http.get(this.url + 'allPatient')
  }

  addPatient(patient : Patient) : Observable<object>{
    return this.http.post(this.url + 'addPatient',patient);
  }

  loginUser(login : Login) : Observable<string>{
    console.log("Inside patient service") ;
   let returnedString = this.http.post(this.url + 'loginValid',login,{ responseType: 'text' } )
    console.log("String got from http post : " , returnedString) ;
    return returnedString;
  }
}
