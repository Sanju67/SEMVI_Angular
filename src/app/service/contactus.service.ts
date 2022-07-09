import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contactus } from '../class/contactus';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  private url: string = `${environment.api_url}`;
  constructor(private http : HttpClient) { }

  addFeedback(contactus : Contactus) : Observable<object>{
    return this.http.post(this.url + 'addFeedback',contactus);
}
}
