import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  workflowid?: number;
  deptid?:number;
  constructor(private httpClient : HttpClient) { }

  addLog(log?:Log): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/log",log ); 
  }

  isAssigned(workflowId:number): Observable<Boolean>{
    return this.httpClient.get<Boolean>(`http://localhost:8080/api/isAssigned/${workflowId}`); 
  }

  getAllLogs(): Observable<Log[]>{
    return this.httpClient.get<Log[]>("http://localhost:8080/api/log");
  }
}
