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
  tickets ?: any;
  empId?:number;

  constructor(
    private ticketService : TicketService,
    private logService : LogsService,
    private workflowService : WorkflowService,
    private employeeService:EmployeeService,
    private snackbar : MatSnackBar,
    private router:Router

  ){}



ngOnInit(): void {
  this.employeeService.getEmployeeIdByUserId(this.clientId).subscribe({
    next:(res)=>{
     this.empId = res;
     console.log(this.empId)
    },
    error:(err)=>{
      this.snackbar.open("Something went wrong! Try restarting the server.","OK");
      console.log(err);
    }
  });
 this.getEmployeesLogs();
}

getEmployeesLogs()
{
  this.employeeService.getEmployeeIdByUserId(this.clientId).subscribe({
    next:(res)=>{
     this.empId = res;
     console.log("empid"+this.empId)
     this.getTheLog(this.empId);


    },
    error:(err)=>{
      this.snackbar.open("Something went wrong cant find empId ! Try restarting the server.","OK");
      console.log(err);
    }
  });
}

getTheLog(empId : number){
  this.logService.getlogsByEmployee(empId,1).subscribe({
    next:(res)=>{
      this.logs = res;
    },
    error:(err)=>{
      this.snackbar.open("Failed fetching workflows. Try restarting the server","Ok");
    }
    })

}
}
