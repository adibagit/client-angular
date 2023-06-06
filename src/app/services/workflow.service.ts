import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Workflow } from '../models/worklow';
import { Department } from '../models/department';

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

  getSingleWorkflows(id?: number): Observable<Workflow>{
    return this.httpClient.get<Workflow>(`http://localhost:8080/api/workflow/${id}`);
  }

  addWorkflow(workflow: Workflow): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/workflow",workflow );
  }

  deleteWorkflow(id?: number): Observable<string>{
    return this.httpClient.delete(`http://localhost:8080/api/workflow?id=${id}`,{ responseType: 'text' });
  }

  isWorkflowExist(id?:number): Observable<boolean>{
    return this.httpClient.get<boolean> (`http://localhost:8080/api/workflowByTicket/${id}`);
  }

  getWorkflowsByDept(deptId:number): Observable<Workflow[]>{
    return this.httpClient.get<Workflow[]>(`http://localhost:8080/api/workflowByDept/${deptId}`);
  }

  getEmployeeDepartment(id?:number): Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/getDeparmentByEmployee/${id}`);
  }

  departmentTickets(id?:number): Observable<Workflow[]>{
    return this.httpClient.get<Workflow[]>(`http://localhost:8080/api/GetDepartmentTickets/${id}`);
  }

  updateWorkflowStatus(workflowid?:number,statusId?: number) : Observable<string>{
    return this.httpClient.put<string>(`http://localhost:8080/api/changeWorkflowStatus/${workflowid}/${statusId}`,{ responseType: 'text' });
  }

  shiftToNextWorkflow(ticketId?: number, priority?: number, statusId?: number): Observable<string> {
    return this.httpClient.put<string>(
      `http://localhost:8080/api/updateStatus/${ticketId}/${priority}/${statusId}`,
      { responseType: 'text' }
    );
  }
  
}
