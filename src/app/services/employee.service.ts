import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  id?: number;
  constructor(private httpClient: HttpClient) { }

  noOfEmployeeRequest : number;

  setId(empId?: number){
    this.id = empId;
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>("http://localhost:8080/api/employee");
  }

  addEmployee(department?: Employee): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/employee",department ); 
  }

  getEmpById():Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/employee/${this.id}`);
  }

  updateEmp(department?: Employee) : Observable<Object>{
    return this.httpClient.put<Object>(`http://localhost:8080/api/employee/${this.id}`,department);
  }

  deleteEmp(id?: number): Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:8080/api/employee?id=${id}`);
  }

  isActive(id?:number):Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/employee/isActive/${id}`);
  }

  getEmployeeRequest(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>("http://localhost:8080/api/employeeRequest");
  }

  getEmployeeIdByUserId(id?: number): Observable<number>{
    return this.httpClient.get<number>(`http://localhost:8080/api/employeeIdFromUserid/${id}`);
  }

}
