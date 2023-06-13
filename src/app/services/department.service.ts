import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Department } from '../models/department';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  id?: number;
  url:string;

  constructor(
    private httpClient: HttpClient,
    private configService : ConfigService
  ) { 
    this.url=this.configService.baseURL;
  }

  setId(deptId?: number){
    this.id = deptId;
  }

  getAllDepartments(): Observable<Department[]>{
    return this.httpClient.get<Department[]>(`${this.url}/departments`);
  }

  addDepartment(department?: Department): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/department`,department );
  }

  getDeptById():Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/department/${this.id}`);
  }

  updateDept(department?: Department) : Observable<Object>{
    return this.httpClient.put<Object>(`${this.url}/department/${this.id}`,department);
  }

  deleteDept(id?: number): Observable<string>{
    return this.httpClient.delete(`${this.url}/department?id=${id}`,{ responseType: 'text' });
  }

  getDepartmentsWithoutManager(): Observable<Department[]>{
    return this.httpClient.get<Department[]>(`${this.url}/departments/withoutManager`);
  }

}
