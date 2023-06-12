import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class S3storageService {

  constructor(private httpClient: HttpClient) { }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post('http://localhost:8080/api/file/uploadToS3', formData, { responseType: 'text' });
  }

  deleteImage(fileName:string): Observable<string> {
    return this.httpClient.delete(`http://localhost:8080/api/file/deleteFromS3/${fileName}`,{ responseType: 'text' });
  }

  displayImage(fileName: string): Observable<HttpResponse<Blob>> {
    const headers = new HttpHeaders().set('Accept', 'image/*');
    return this.httpClient.get(`http://localhost:8080/api/file/displayS3Image/${fileName}`, {
      headers: headers,
      observe: 'response',
      responseType: 'blob'
    });
  }
}
