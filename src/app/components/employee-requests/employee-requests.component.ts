import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-requests',
  templateUrl: './employee-requests.component.html',
  styleUrls: ['./employee-requests.component.css']
})
export class EmployeeRequestsComponent implements OnInit{

  employees: any;

  employeeRequest : any ={
    user:{userid:''},
    department:{deptid:''}
  }

  departments:any;

  constructor(private employeeService : EmployeeService,
    private snackBar: MatSnackBar,
    private deptService : DepartmentService,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployeeRequest().subscribe({
      next:(res)=>{
        this.employees = res;
        this.employeeService.noOfEmployeeRequest = this.employees.length;
        //count emps for badge 
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });

    this.deptService.getAllDepartments().subscribe({
      next:(res)=>{
        this.departments=res;
      }
    })
  }

  acceptRequest(employee :any): void {
    this.employeeRequest.user.userid = employee.userid;
    if(this.employeeRequest.department.deptid === null || this.employeeRequest.department.deptid === ''){
      this.snackBar.open("Please select department","OK");
    }else{
      this.employeeService.addEmployee(this.employeeRequest).subscribe({
        next:(res)=>{
          this.snackBar.open("Accepted","OK");
          this.ngOnInit();
        },
        error:(err)=>{
          this.snackBar.open("Failed accepting request!","OK");
          console.log(err);
        }
      });
    }
    
  }

  denyRequest(employee :any): void {
    this.userService.deleteUser(employee.userid).subscribe({
      next:(res)=>{
        alert("inn")
        this.snackBar.open("Discarded","OK");
        this.ngOnInit();
      },
      error:(err)=>{
        //this.snackBar.open("Request Failed!","OK");
        this.ngOnInit();
        console.log(err);
      }
    });
  }


}
