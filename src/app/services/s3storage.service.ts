import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class S3storageService {

  url:string;

  constructor(private httpClient: HttpClient,private configService : ConfigService) { 
    this.url=this.configService.baseURL;
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.url}/file/uploadToS3`, formData, { responseType: 'text' });
  }

  deleteImage(fileName:string): Observable<string> {
    return this.httpClient.delete(`${this.url}/file/deleteFromS3/${fileName}`,{ responseType: 'text' });
  }

  displayImage(fileName: string): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders().set('Accept', 'image/*');
    return this.httpClient.get(`${this.url}/file/displayS3Image/${fileName}`, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }
}
