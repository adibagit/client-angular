import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  ticketImages : any;
  id?: number;
  
  constructor(private httpClient: HttpClient) { }

  getImagesByTicket(id:number): Observable<Image[]>{
    return this.httpClient.get<Image[]>(`http://localhost:8080/api/imageByTicket/${id}`);
  }

  addImage(image?: Image): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/image",image ); 
  }

  deleteImage(id?: number): Observable<string>{
    return this.httpClient.delete(`http://localhost:8080/api/image?id=${id}`,{ responseType: 'text' });
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.httpClient.post('http://localhost:8080/api/image/upload', formData, { responseType: 'text' });
  }

}
