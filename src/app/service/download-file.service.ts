import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileData } from '../class/file-data';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(private http: HttpClient) {
  }

  download(file: string | undefined): Observable<Blob> {
    return this.http.get(`${environment.api_url}downloadfile/${file}`, {
      responseType: 'blob'
    });
  }

  list(): Observable<FileData[]> {
    return this.http.get<FileData[]>(`${environment.api_url}getfiles`);
  }

  upload(file: File,filename : any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${environment.api_url}upload/${filename}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
