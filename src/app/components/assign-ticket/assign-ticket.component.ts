import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.css']
})
export class AssignTicketComponent implements OnInit{

  employees:any;
  worflowId:number = Number(this.logService.workflowid);
  deptId:number = Number(this.logService.deptid);

  log:any={
    workflow:{workflowid:this.worflowId},
    employee:{empid:''},
    status:{statusid:11},
    comment: "Ticket assigned to employee "
  }

  constructor(
    private employeeService : EmployeeService,
    private logService : LogService,
    private snackbar : MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
    //get emp dept wise
    this.employeeService.getEmployeesByDept(this.deptId).subscribe({
      next:(res)=>{
        this.employees = res;
      }
    })
  }

  assignTicket(){
    this.logService.addLog(this.log).subscribe({
      next:(res)=>{
        this.snackbar.open("Assigned","Ok");
      }
    });
    
  }

}
