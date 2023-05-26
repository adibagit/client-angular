import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Workflow } from '../models/worklow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  id?: number;

  constructor(private httpClient: HttpClient) { }

  getAllWorkflowsByTicket(ticketId:number): Observable<Workflow[]>{
    return this.httpClient.get<Workflow[]>(`http://localhost:8080/api/workflowByTicket/${ticketId}`);
  }

  getAllWorkflows(): Observable<Workflow[]>{
    return this.httpClient.get<Workflow[]>('http://localhost:8080/api/workflow');
  }

  addWorkflow(workflow: Workflow): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/workflow",workflow ); 
  }

  deleteWorkflow(id?: number): Observable<Object>{
    return this.httpClient.delete<Object>(`http://localhost:8080/api/workflow?id=${id}`);
  }

  isWorkflowExist(id?:number): Observable<boolean>{
    return this.httpClient.get<boolean>(`http://localhost:8080/api/workflowByTicket/${id}`);
  }

}
