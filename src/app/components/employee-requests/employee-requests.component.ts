import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-requests',
  templateUrl: './employee-requests.component.html',
  styleUrls: ['./employee-requests.component.css']
})
export class EmployeeRequestsComponent implements OnInit{

  employees: any;
  managerChecked=false;
  departments:any;
  managers:any;

  employeeRequest : any ={
    user:{userid:''},
    department:{deptid:''}
  }

  constructor(
    private employeeService : EmployeeService,
    private snackBar: MatSnackBar,
    private deptService : DepartmentService,
    private userService : UserService,
    private managerService : ManagerService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployeeRequest().subscribe({
      next:(res)=>{
        this.employees = res;
        this.employeeService.noOfEmployeeRequest = this.employees.length;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data!","Dismiss", { duration: 5000 });
      }
    });
    this.filterDepartments();
  }

  acceptRequest(employee :any): void {
    this.employeeRequest.user.userid = employee.userid;
    if(this.employeeRequest.department.deptid === null || this.employeeRequest.department.deptid === ''){
      this.snackBar.open("Please select department","OK", { duration: 5000 });
    }else{
      if(this.managerChecked){
        this.managerService.addManager(this.employeeRequest).subscribe({
          next:(res)=>{
            this.snackBar.open("Accepted as Manager","OK", { duration: 5000 });
            this.userService.getUser(this.employeeRequest.user.userid).subscribe({
              next:(result)=>{
                result.usertype='manager';
                this.userService.id=result.userid;
                this.userService.updateUser(result).subscribe(() => {
                  this.ngOnInit();
                });
              }
            })
          },
          error:(err)=>{
            this.snackBar.open("Failed accepting request!","Dismiss", { duration: 5000 });
          }
        });
      }else{
        this.employeeService.addEmployee(this.employeeRequest).subscribe({
          next:(res)=>{
            this.snackBar.open("Accepted","OK", { duration: 5000 });
            this.ngOnInit();
          },
          error:(err)=>{
            this.snackBar.open("Failed accepting request!","Dismiss", { duration: 5000 });
          }
        });
      }
    } 
  }

  denyRequest(employee :any): void {
    this.userService.deleteUser(employee.userid).subscribe({
      next:(res)=>{
        alert("inn")
        this.snackBar.open("Discarded","OK", { duration: 5000 });
        this.ngOnInit();
      },
      error:(err)=>{
        this.ngOnInit();
      }
    });
  }

  filterDepartments(): void {
    if (this.managerChecked) {
      this.deptService.getDepartmentsWithoutManager().subscribe({
        next: (res) => {
          this.departments = res;
        },
        error: (err) => {
          this.snackBar.open("Failed retrieving data!", "Dismiss", { duration: 5000 });
        }
      });
    } else {
      this.deptService.getAllDepartments().subscribe({
        next: (res) => {
          this.departments = res;
        },
        error: (err) => {
          this.snackBar.open("Failed retrieving data!", "Dismiss", { duration: 5000 });
        }
      });
    }
  }
  
}
