import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Logs } from '../models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  statusId?: number;
  employeeId?: number;
  constructor(private httpClient: HttpClient) {}

  getlogsByEmployee(employeeId?: number,statusId?:number):Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/logsByEmployee/${employeeId}/${statusId}`);
  }

}
