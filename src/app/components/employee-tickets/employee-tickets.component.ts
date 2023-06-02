import { Component,OnInit } from '@angular/core';
import { AssignToMeComponent } from '../assign-to-me/assign-to-me.component';
import { TicketService } from 'src/app/services/ticket.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/services/image.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-tickets',
  templateUrl: './employee-tickets.component.html',
  styleUrls: ['./employee-tickets.component.css']
})
export class EmployeeTicketsComponent implements OnInit{

  logs: any = {
    workflow: {workflowid:''},
    employee: {empid:''},
    status:{statusid:1}
  };
  addedLog:any;

constructor(
    private dialog:MatDialog,
    private ticketService : TicketService,
    private workflowService : WorkflowService,
    private employeeService : EmployeeService,
    private snackbar : MatSnackBar,
    private imageService : ImageService

  ){}

  clientId : number = Number(sessionStorage.getItem('userid'));
  workflowid:number;
  tickets ?: any;
  workflows ?: any;
  department ?: any;
  workf?:any;

  ticketImages: { [ticketId: number]: any[] } = {};

  ngOnInit(): void {
   this.getDepartmentAllTickets();
   console.log("the array : ",this.clientId)
  }

  openAssignToMe(workflowid: number,ticketsid:number) {
    this.logs.workflow.workflowid=workflowid;
    this.changeTicketStatus(ticketsid);
    this.createLogEntry(workflowid);
    this.getDepartmentAllTickets();
  }

  changeTicketStatus(ticketsid:number){

    this.ticketService.updateTicketStatus(ticketsid,3).subscribe({
      next:(res)=>{
        this.snackbar.open("Ticket Status Updated Successfully","OK");
       console.log("ticket status"+res)
      },
      error:(err)=>{
        this.snackbar.open("Something went wrong cant update ticket status ! Try restarting the server.","OK");
        console.log(err);
      }
    });

  }

getWorkflowById(workflowid:number){

  console.log(workflowid+"this is the workflow id from change ticket status");
    this.workflowService.getSingleWorkflows(workflowid).subscribe({
      next:(res)=>{
      this.workf=res;
       console.log("workflow instance"+res)
      },
      error:(err)=>{
        this.snackbar.open("Something went wrong can find workflow  ! Try restarting the server.","OK");
        console.log(err);
      }
    });
}

  changeWorkflowStatus(workflowid:number){

    this.workflowService.updateWorkflowStatus(workflowid,3).subscribe({
      next:(res)=>{
        this.snackbar.open("Workflow Status Updated Successfully","OK");
       console.log("workflow status"+res)
      },
      error:(err)=>{
      //  this.snackbar.open("Something went wrong cant update workflow status ! Try restarting the server.","OK");
        console.log(err);
      }
    });

  }

  createLogEntry(workflowid:number){
    
    console.log("workflowid"+this.logs.workflow.workflowid);
    this.employeeService.getEmployeeIdByUserId(this.clientId).subscribe({
      next:(res)=>{
       this.logs.employee.empid = res;
       console.log("empid"+this.logs.employee.empid)
       this.addTheLog();
       this.changeWorkflowStatus(workflowid);
       this.getDepartmentAllTickets();

      },
      error:(err)=>{
        this.snackbar.open("Something went wrong cant find empId ! Try restarting the server.","OK");
        console.log(err);
      }
    });

  }


addTheLog(){
  console.log("logs"+this.logs);
  this.ticketService.addLog(this.logs).subscribe({
    next:(res) => {
      console.log(res);
      this.addedLog = res;
      this.snackbar.open("Log added successfully.", "OK");
    },
    error:(err) => {
      this.snackbar.open("Failed adding log", "OK");
    }})
}

  getDepartmentAllTickets()
  {
       this.workflowService.getEmployeeDepartment(this.clientId).subscribe({
        next:(res)=>{
      //  this.getTheWorkflows(this.department.deptid);
      this.department=res;
      this.getTheWorkflows(this.department);
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


}
