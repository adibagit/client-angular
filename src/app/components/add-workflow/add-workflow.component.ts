import { Component , OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from 'src/app/models/department';
import { Ticket } from 'src/app/models/ticket';
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
    ticket:{ticketid:'',statusid:''},
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
  }

  getAllDepartments(){
    this.departmentService.getAllDepartments().subscribe({
      next:(res)=>{
       this.departments = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong!","OK", { duration: 5000 });
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
    this.workflow.status.statusid = this.tasks.length === 1 ? 10 : 12;

    this.workflowService.addWorkflow(this.workflow).subscribe({
      next:(res)=>{
        if(res){
          let ticket:Ticket;
          this.ticketService.getTicketById(this.ticketService.id).subscribe({
            next:(res)=>{
              ticket=res;
              if (ticket.status) {
                ticket.status.statusid = 3;
                this.ticketService.updateTicket(ticket).subscribe();
              }
            }
          });
        }
        this.snackBar.open("Workflow added successfully.","OK", { duration: 5000 });
      },
      error:(err)=>{
        this.snackBar.open("Failed adding workflow!","OK", { duration: 5000 })
      }
    });
    this.workflow.description = '';
    this.workflow.department.deptid = null;
    this.getAllDepartments();
  }

}
