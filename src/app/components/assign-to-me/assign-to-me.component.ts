import { Component, OnInit, ViewChild,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assign-to-me',
  templateUrl: './assign-to-me.component.html',
  styleUrls: ['./assign-to-me.component.css']
})
export class AssignToMeComponent implements OnInit{

  logs: any = {
    logid: {logid:''},
    workflow: {workflowid:''},
    employee: {empid:''},
    status:{statusid:1},
    comment:'',
    logdate: ''
  };

  clientId : number = Number(sessionStorage.getItem('userid'));
  workflows ?: any;
  department ?: any;
  tickets ?: any;
  empId?:number;

  constructor(
    private ticketService : TicketService,
    private workflowService : WorkflowService,
    private employeeService:EmployeeService,
    private snackbar : MatSnackBar,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: { workflow: any }
  
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
 this.getDepartmentAllTickets();
}

getDepartmentAllTickets()
{
  console.log(this.data.workflow)

}
}
