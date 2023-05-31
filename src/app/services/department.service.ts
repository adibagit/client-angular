import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Department } from '../models/department';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  id?: number;
  constructor(private httpClient: HttpClient) { }

  setId(deptId?: number){
    this.id = deptId;
  }

  getAllDepartments(): Observable<Department[]>{
    return this.httpClient.get<Department[]>("http://localhost:8080/api/departments");
  }

  addDepartment(department?: Department): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/department",department );
  }

  getDeptById():Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/department/${this.id}`);
  }

  updateDept(department?: Department) : Observable<Object>{
    return this.httpClient.put<Object>(`http://localhost:8080/api/department/${this.id}`,department);
  }

  deleteDept(id?: number): Observable<Object>{
    return this.httpClient.delete<Object>(`http://localhost:8080/api/department?id=${id}`);
  }


}
