import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../models/manager';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  id?: number;
  url:string;

  constructor(private httpClient : HttpClient,private configService : ConfigService) { 
    this.url=this.configService.baseURL;
  }

  setId(managerid?: number){
    this.id = managerid;
  }

  getAllManagers(): Observable<Manager[]>{
    return this.httpClient.get<Manager[]>(`${this.url}/manager`);
  }

  getManagerById(): Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/manager/${this.id}`);
  }

  updateManager(department?: Manager) : Observable<Object>{
    return this.httpClient.put<Object>(`${this.url}/manager/${this.id}`,department);
  }

  deleteManager(id?: number): Observable<string>{
    return this.httpClient.delete(`${this.url}/manager?id=${id}`,{ responseType: 'text' });
  }

  addManager(manager:Manager): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/manager`,manager ); 
  }

  getManagerByUser(userId : number): Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/managerByUser/${userId}`);
  }

  getManagerByDepartment(deptId : number): Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/managerByDept/${deptId}`);
  }
}
