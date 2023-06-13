import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/log';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  workflowid?: number;
  deptid?:number;
  url:string;

  constructor(private httpClient : HttpClient,private configService : ConfigService) {
    this.url=this.configService.baseURL;
   }

  addLog(log?:Log): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/log`,log ); 
  }

  isAssigned(workflowId:number): Observable<Boolean>{
    return this.httpClient.get<Boolean>(`${this.url}/isAssigned/${workflowId}`); 
  }

  getAllLogs(): Observable<Log[]>{
    return this.httpClient.get<Log[]>(`${this.url}/log`);
  }

  getAssignee(workflowId:number): Observable<Log[]>{
    return this.httpClient.get<Log[]>(`${this.url}/log/getAssignee/${workflowId}`);
  }
}
