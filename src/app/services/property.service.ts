import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Property } from '../models/property';
import { Area } from '../models/area';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  id?: number;
  constructor(private httpClient: HttpClient) { }

  setId(propId?: number){
    this.id = propId;
  }

  getAllProperties(): Observable<Property[]>{
    return this.httpClient.get<Property[]>("http://localhost:8080/api/properties");
  }

  getAllAreas(): Observable<Area[]>{
    return this.httpClient.get<Area[]>("http://localhost:8080/api/areas");
  }

  addProperty(property?: Property): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/properties",property ); 
  }

  getPropById():Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/properties/${this.id}`);
  }

  updateProp(property?: Property) : Observable<Object>{
    return this.httpClient.put<Object>(`http://localhost:8080/api/properties/${this.id}`,property);
  }

  deleteProp(id?: number): Observable<Object>{
    return this.httpClient.delete<Object>(`http://localhost:8080/api/properties?id=${id}`);
  }
  
}
