import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Workflow } from '../models/worklow';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  id?: number;
  url:string;

  constructor(private httpClient: HttpClient,private configService : ConfigService) { 
    this.url=this.configService.baseURL;
  }

  getAllWorkflowsByTicket(ticketId:number): Observable<Workflow[]>{
    return this.httpClient.get<Workflow[]>(`${this.url}/workflowByTicket/${ticketId}`);
  }

  getAllWorkflows(): Observable<Workflow[]>{
    return this.httpClient.get<Workflow[]>(`${this.url}/workflow`);
  }

  getSingleWorkflows(id?: number): Observable<Workflow>{
    return this.httpClient.get<Workflow>(`${this.url}/workflow/${id}`);
  }

  addWorkflow(workflow: Workflow): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/workflow`,workflow );
  }

  deleteWorkflow(id?: number): Observable<string>{
    return this.httpClient.delete(`${this.url}/workflow?id=${id}`,{ responseType: 'text' });
  }

  isWorkflowExist(id?:number): Observable<boolean>{
    return this.httpClient.get<boolean> (`${this.url}/workflowByTicket/${id}`);
  }

  getWorkflowsByDept(deptId:number): Observable<Workflow[]>{
    return this.httpClient.get<Workflow[]>(`${this.url}/workflowByDept/${deptId}`);
  }

  getEmployeeDepartment(id?:number): Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/getDeparmentByEmployee/${id}`);
  }

  departmentTickets(id?:number): Observable<Workflow[]>{
    return this.httpClient.get<Workflow[]>(`${this.url}/GetDepartmentTickets/${id}`);
  }

  updateWorkflowStatus(workflowid?:number,statusId?: number) : Observable<string>{
    return this.httpClient.put<string>(`${this.url}/changeWorkflowStatus/${workflowid}/${statusId}`,{ responseType: 'text' });
  }

  shiftToNextWorkflow(ticketId?: number, priority?: number, statusId?: number): Observable<string> {
    return this.httpClient.put<string>(
      `${this.url}/updateStatus/${ticketId}/${priority}/${statusId}`,
      { responseType: 'text' }
    );
  }
  
}
