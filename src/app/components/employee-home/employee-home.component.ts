import { Component,OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/models/log';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from 'src/app/models/ticket';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit{

  logs: any = {
    workflow: {workflowid:''},
    employee: {empid:''},
    status:{statusid:1}
  };
  addedLog:any;
  allLogs:any;
  assignedTo:any;
  clientId : number = Number(sessionStorage.getItem('userid'));
  workflowid:number;
  tickets ?: any;
  workflows ?: any;
  department ?: any;
  workflow?:any;
  assignee:string;
  ticketImages: { [ticketId: number]: any[] } = {};

  constructor(
    private ticketService : TicketService,
    private workflowService : WorkflowService,
    private employeeService : EmployeeService,
    private snackbar : MatSnackBar,
    private logService : LogService,
    private dialog : MatDialog
  ){}

  ngOnInit(): void {
   this.getDepartmentAllTickets();
   this.logService.getAllLogs().subscribe({
    next:(res)=>{
      this.allLogs=res;
    }
   });
  }

  openAssignToMe(workflowid: number,ticketsid:number) {
    this.logs.workflow.workflowid=workflowid;
    this.createLogEntry(workflowid);
    this.ngOnInit();
  }

  changeTicketStatus(ticketsid:number){
    this.ticketService.updateTicketStatus(ticketsid,3).subscribe({
      next:(res)=>{
        this.snackbar.open("Ticket Status Updated Successfully","OK");
      },
      error:(err)=>{
        this.snackbar.open("Something went wrong cant update ticket status ! Try restarting the server.","OK");
      }
    });
  }

  getWorkflowById(workflowid:number){
    this.workflowService.getSingleWorkflows(workflowid).subscribe({
      next:(res)=>{
        this.workflow=res;
      },
      error:(err)=>{
        this.snackbar.open("Something went wrong can find workflow  ! Try restarting the server.","OK");
      }
    });
  }

  changeWorkflowStatus(workflowid:number){
    this.workflowService.updateWorkflowStatus(workflowid,3).subscribe({
      next:(res)=>{
        this.snackbar.open("Workflow Status Updated Successfully","OK");
      }
    });
  }

  createLogEntry(workflowid:number){
    this.employeeService.getEmployeeIdByUserId(this.clientId).subscribe({
      next:(res)=>{
        this.logs.status.statusid=11;
        this.logs.employee.empid = res;
        this.addTheLog();
        this.getDepartmentAllTickets();
      },
      error:(err)=>{
        this.snackbar.open("Something went wrong cant find empId ! Try restarting the server.","OK");
      }
    });
  }

  addTheLog(){
    this.ticketService.addLog(this.logs).subscribe({
      next:(res) => {
        this.addedLog = res;
        this.snackbar.open("Assigned to you successfully.", "OK");
        this.ngOnInit();
      },
      error:(err) => {
        this.snackbar.open("Failed assigning ticket", "OK");
      }})
  }

  getDepartmentAllTickets()
  {
    this.workflowService.getEmployeeDepartment(this.clientId).subscribe({
      next:(res)=>{
        this.department=res;
        this.getTheWorkflows(this.department);
        sessionStorage.setItem("deptid",this.department);
      },
      error:(err)=>{
        this.snackbar.open("Failed fetching employee department. Try restarting the server","Ok");
      }
    })
  }

  getTheWorkflows(deptId: number){
    this.workflowService.departmentTickets(deptId).subscribe({
      next:(res)=>{
        this.workflows = res;
      },
      error:(err)=>{
        this.snackbar.open("Failed fetching workflows. Try restarting the server","Ok");
      }
    })
  }

  checkAssigned(workflow: any): boolean { 
    let isAssigned = (workflow.status.statusid === 10 || workflow.status.statusid === 12) && !this.allLogs.some((log: Log) => 
      log.workflow && log.workflow.workflowid === workflow.workflowid && log.status && log.status.statusid === 11
    );   

    if(!isAssigned){
      this.assignedTo = this.allLogs.find((obj: any) => 
        obj.workflow.workflowid === workflow.workflowid)?.employee.user.firstname;
    }
    return isAssigned;  
  }

  viewTicketDetails(ticketId:number){
    this.ticketService.id=ticketId;
    this.dialog.open(TicketDetailsComponent)
  }
  
}