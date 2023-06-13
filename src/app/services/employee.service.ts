import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Employee } from '../models/employee';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  id?: number;
  constructor(private httpClient: HttpClient,private configService : ConfigService) { 
    this.url=this.configService.baseURL;
  }

  noOfEmployeeRequest : number;
  url:string;

  setId(empId?: number){
    this.id = empId;
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.url}/employee`);
  }

  addEmployee(department?: Employee): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/employee`,department ); 
  }

  getEmpById():Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/employee/${this.id}`);
  }

  updateEmp(department?: Employee) : Observable<Object>{
    return this.httpClient.put<Object>(`${this.url}/employee/${this.id}`,department);
  }

  deleteEmp(id?: number): Observable<string>{
    return this.httpClient.delete(`${this.url}/employee?id=${id}`,{ responseType: 'text' });
  }

  isActive(id?:number):Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/employee/isActive/${id}`);
  }

  getEmployeeRequest(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.url}/employeeRequest`);
  }

  getEmployeesByDept(id?:number): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.url}/employeeByDept/${id}`);
  }

  getEmployeeIdByUserId(id?: number): Observable<number>{
    return this.httpClient.get<number>(`${this.url}/employeeIdFromUserid/${id}`);
  }

}
