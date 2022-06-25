import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contactus } from '../class/contactus';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http : HttpClient) { }

  addFeedback(contactus : Contactus) : Observable<object>{
    return this.http.post("http://localhost:8080/addFeedback",contactus);
}
}
