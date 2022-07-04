import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../class/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
  constructor(private http : HttpClient) { }

  getAllRequestTest() : Observable<object>{
    // accept httpClient
    // import httpCLient in app.module.ts
    return this.http.get("http://localhost:8080/allTest"); 
  }
  addNewTest(test : Test) : Observable<object>{
    console.log("test service called : ");
    const result = this.http.post("http://localhost:8080/addNewTest",test); ;
    console.log("After calling api",result) ;
    return this.http.post("http://localhost:8080/addNewTest",test);
}
}
