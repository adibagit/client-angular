import { Component,OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  deptId:number=Number(sessionStorage.getItem("deptid"));
  department:any;
  workflows:any;
  employees:any;
  isLoading = true;

  constructor(
    private deptService : DepartmentService,
    private workflowService : WorkflowService,
    private employeeService : EmployeeService
  ){}

  ngOnInit(): void {
    this.isLoading=true;
    this.deptService.setId(this.deptId);
    this.deptService.getDeptById().subscribe({
      next:(result)=>{
        this.department=result;
        this.isLoading=false;
      }
    });
    this.workflowService.getWorkflowsByDept(this.deptId).subscribe({
      next:(result)=>{
        this.workflows=result;
        this.isLoading=false;
      }
    });
    this.employeeService.getEmployeesByDept(this.deptId).subscribe({
      next:(result)=>{
        this.employees=result;
        this.isLoading=false;
      }
    });
  }

  getActiveTicketsCount(): number {
    return this.workflows.filter((workflow: { status: { status: string; }; }) => 
           workflow.status.status === 'to-do' || workflow.status.status === 'doing' ).length;
  }

  getPendingTicketsCount(): number {
    return this.workflows.filter((workflow: { status: { status: string; }; }) => workflow.status.status === 'pending' ).length;
  }
  
  getCompletedTicketsCount(): number {
    return this.workflows.filter((workflow: { status: { status: string; }; }) => workflow.status.status === 'completed' ).length;
  }

}
