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
  isLoading = true;

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
   this.isLoading=true;
   this.logService.getAllLogs().subscribe({
    next:(res)=>{
      this.allLogs=res;
      this.isLoading=false;
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
        this.snackbar.open("Ticket Status Updated Successfully","OK", { duration: 5000 });
      },
      error:(err)=>{
        this.snackbar.open("Something went wrong!","OK", { duration: 5000 });
      }
    });
  }

  getWorkflowById(workflowid:number){
    this.isLoading=true;
    this.workflowService.getSingleWorkflows(workflowid).subscribe({
      next:(res)=>{
        this.workflow=res;
        this.isLoading=false;
      },
      error:(err)=>{
        this.snackbar.open("Something went wrong !","Dismiss", { duration: 5000 });
        this.isLoading=false;
      }
    });
  }

  changeWorkflowStatus(workflowid:number){
    this.workflowService.updateWorkflowStatus(workflowid,3).subscribe({
      next:(res)=>{
        this.snackbar.open("Workflow Status Updated Successfully","OK", { duration: 5000 });
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
        this.snackbar.open("Something went wrong cant find empId !","OK", { duration: 5000 });
      }
    });
  }

  addTheLog(){
    this.ticketService.addLog(this.logs).subscribe({
      next:(res) => {
        this.addedLog = res;
        this.snackbar.open("Assigned to you successfully.", "OK", { duration: 5000 });
        this.ngOnInit();
      },
      error:(err) => {
        this.snackbar.open("Failed assigning ticket", "OK", { duration: 5000 });
      }})
  }

  getDepartmentAllTickets()
  {
    this.isLoading=true;
    this.workflowService.getEmployeeDepartment(this.clientId).subscribe({
      next:(res)=>{
        this.department=res;
        this.getTheWorkflows(this.department);
        this.isLoading=false;
        sessionStorage.setItem("deptid",this.department);
      },
      error:(err)=>{
        this.snackbar.open("Failed fetching employee department.","Dismiss", { duration: 5000 });
        this.isLoading=false;
      }
    })
  }

  getTheWorkflows(deptId: number){
    this.isLoading=true;
    this.workflowService.departmentTickets(deptId).subscribe({
      next:(res)=>{
        this.workflows = res;
        this.isLoading=false;
      },
      error:(err)=>{
        this.snackbar.open("Failed fetching workflows","Dismiss", { duration: 5000 });
        this.isLoading=true;
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