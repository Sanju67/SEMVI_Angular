import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Test } from '../class/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {
 
  private url: string = `${environment.api_url}`;
  constructor(private http : HttpClient) { }

  getAllRequestTest() : Observable<object>{
    // accept httpClient
    // import httpCLient in app.module.ts
    return this.http.get(this.url + "allTest"); 
  }
  addNewTest(test : Test) : Observable<object>{
    console.log("test service called : ");
    const result = this.http.post(this.url + "addNewTest",test);
    console.log("After calling api",result) ;
    return result;
  }

  updateStatus(test : Test) : Observable<object>{
    const result = this.http.post(this.url + "updateStatus",test);
    return result ;
  }
}
