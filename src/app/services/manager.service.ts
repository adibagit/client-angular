import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Employee } from '../models/employee';
import { Manager } from '../models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  id?: number;
  constructor(private httpclient : HttpClient) { }

  setId(managerid?: number){
    this.id = managerid;
  }

getAllManagers(): Observable<Manager[]>{
  return this.httpclient.get<Manager[]>("http://localhost:8080/api/manager");
}

getManagerById(): Observable<Object>{
  return this.httpclient.get<Object>(`http://localhost:8080/api/manager/${this.id}`);
}

updateManager(department?: Manager) : Observable<Object>{
  return this.httpclient.put<Object>(`http://localhost:8080/api/manager/${this.id}`,department);
}

deleteManager(id?: number): Observable<Object>{
  return this.httpclient.delete<Object>(`http://localhost:8080/api/manager?id=${id}`);
}
}
