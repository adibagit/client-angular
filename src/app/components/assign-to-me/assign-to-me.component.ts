import { Component, OnInit, ViewChild,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { LogsService } from 'src/app/services/logs.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-to-me',
  templateUrl: './assign-to-me.component.html',
  styleUrls: ['./assign-to-me.component.css']
})
export class AssignToMeComponent implements OnInit{

  logs: any;
  clientId : number = Number(sessionStorage.getItem('userid'));
  workflows ?: any;
  department ?: any;
  currentTicketWorkflows ?: any;
  empId?:number;
  startedWorking?:boolean;
  showComplete?:boolean;
  isLoading = true;

  constructor(
    private ticketService : TicketService,
    private logService : LogsService,
    private workflowService : WorkflowService,
    private employeeService:EmployeeService,
    private snackbar : MatSnackBar,
    private router:Router
  ){}

  ngOnInit(): void {
    this.getEmployeesLogs();
  }

  getEmployeesLogs()
  {
    this.isLoading=true;
    this.employeeService.getEmployeeIdByUserId(this.clientId).subscribe({
      next:(res)=>{
      this.empId = res;
      this.getTheLog(this.empId);
      this.isLoading=false;
      },
      error:(err)=>{
        this.snackbar.open("Something went wrong!","Dismiss", { duration: 5000 });
        this.isLoading=false;
      }
    });
  }

  getTheLog(empId : number){
    this.isLoading=true;
    this.logService.getlogsByEmployee(empId,11).subscribe({
      next:(res)=>{
        this.logs = res;
        this.isLoading=false;
      },  
      error:(err)=>{
        this.snackbar.open("Failed fetching workflows. ","Dismiss", { duration: 5000 });
        this.isLoading=false;
      }
    })
  }

  startWorking(workflow: any) {
    this.workflowService.updateWorkflowStatus(workflow.workflowid,13).subscribe({
      next:(res)=>{
        this.snackbar.open("Workflow Status Updated Successfully","OK", { duration: 5000 });
        this.ngOnInit();
      }
    });
    this.startedWorking = true;
    this.ngOnInit();
  }
  
  completeWorking(workflow: any) {
    this.workflowService.updateWorkflowStatus(workflow.workflowid,4).subscribe({
      next:(res)=>{
        this.snackbar.open("Workflow Status Updated Successfully","OK", { duration: 5000 });
        this.ngOnInit();
      }
    });

    this.workflowService.getAllWorkflowsByTicket(workflow.ticket.ticketid).subscribe({
      next:(res)=>{
        this.currentTicketWorkflows=res;
        const lastPriority = this.currentTicketWorkflows.reduce((maxPriority: number, w: any) => Math.max(maxPriority, w.priority), -Infinity);
        const isLastPriority = workflow.priority === lastPriority;
        if(isLastPriority){
          this.ticketService.updateTicketStatus(workflow.ticket.ticketid,4).subscribe();
        }
      }
    })

    this.workflowService.shiftToNextWorkflow(workflow.ticket.ticketid,workflow.priority+1,10).subscribe({
      next:(res)=>{
        this.snackbar.open("Task completed successfully.","Ok", { duration: 5000 });
      }
    })
    this.ngOnInit();
  }

}