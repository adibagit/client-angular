import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Property } from '../models/property';
import { Area } from '../models/area';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  id?: number;
  url:string;

  constructor(private httpClient: HttpClient,private configService : ConfigService) {
    this.url=this.configService.baseURL;
   }

  setId(propId?: number){
    this.id = propId;
  }

  getAllProperties(): Observable<Property[]>{
    return this.httpClient.get<Property[]>(`${this.url}/properties`);
  }

  getAllAreas(): Observable<Area[]>{
    return this.httpClient.get<Area[]>(`${this.url}/areas`);
  }

  addProperty(property?: Property): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/properties`,property ); 
  }

  getPropById():Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/properties/${this.id}`);
  }

  updateProp(property?: Property) : Observable<Object>{
    return this.httpClient.put<Object>(`${this.url}/properties/${this.id}`,property);
  }

  deleteProp(id?: number): Observable<string>{
    return this.httpClient.delete(`${this.url}/properties?id=${id}`,{ responseType: 'text' });
  }
  
}
