import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Image } from '../models/image';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  ticketImages : any;
  id?: number;
  url:string;
  
  constructor(private httpClient: HttpClient,private configService : ConfigService) { 
    this.url=this.configService.baseURL;
  }

  getImagesByTicket(id:number): Observable<Image[]>{
    return this.httpClient.get<Image[]>(`${this.url}/imageByTicket/${id}`);
  }

  addImage(image?: Image): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/image`,image ); 
  }

  deleteImage(id?: number): Observable<string>{
    return this.httpClient.delete(`${this.url}/image?id=${id}`,{ responseType: 'text' });
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.httpClient.post(`${this.url}/image/upload`, formData, { responseType: 'text' });
  }

}
