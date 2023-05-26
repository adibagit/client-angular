import { Component , ElementRef, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { TicketService } from 'src/app/services/ticket.service';
import { WorkflowService } from 'src/app/services/workflow.service';


@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.css']
})
export class AddWorkflowComponent implements OnInit{


  departments:any;

  workflow:any={
    ticket:{ticketid:''},
    department:{deptid:''},
    status:{statusid:''},
    description:'',
    priority:''
  }

  tasks: any[] = [];

  

  constructor(
    private departmentService: DepartmentService,
    private ticketService : TicketService,
    private snackBar: MatSnackBar,
    private workflowService: WorkflowService
  ){}
  ngOnInit(): void {
    this.workflow.ticket.ticketid = this.ticketService.id as number;
    this.getAllDepartments();
    console.log(this.workflow.ticket.ticketid);
  }

  getAllDepartments(){

    this.departmentService.getAllDepartments().subscribe({
      next:(res)=>{
       this.departments = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong! Try restarting the server.","OK");
        console.log(err);
      }
    });
  }

  addWorkflow(){

    
    const newTask = {
      description: this.workflow.description,
      department: this.departments.find((department: Department) => department.deptid === this.workflow.department.deptid)
    };

    this.tasks.push(newTask);

    this.workflow.priority = this.tasks.length;
    this.workflow.status.statusid = this.tasks.length === 1 ? 2 : 1;

    this.workflowService.addWorkflow(this.workflow).subscribe({
      next:(res)=>{
        this.snackBar.open("Workflow added successfully.","OK");
      },
      error:(err)=>{
        this.snackBar.open("Failed adding workflow!","OK")
        console.log(err);
      }
    });
    
    this.workflow.description = '';
    this.workflow.department.deptid = null;
    this.getAllDepartments();
  }

  

}
