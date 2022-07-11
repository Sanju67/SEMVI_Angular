import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../class/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url: string = `${environment.api_url}`;
  constructor(private http : HttpClient) { }

  addReport(report : Report) : Observable<object>{
    const result = this.http.post(this.url + "addNewReport",report);
    console.log("Result after adding report ",result) ;
    return result;
  }

  getAllReport() : Observable<object>{
    // accept httpClient
    // import httpCLient in app.module.ts
    return this.http.get(this.url + "allReports"); 
  }
}
