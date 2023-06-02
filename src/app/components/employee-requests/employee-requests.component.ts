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

  employeeRequest : any ={
    user:{userid:''},
    department:{deptid:''}
  }

  departments:any;

  constructor(private employeeService : EmployeeService,
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
      if(this.managerChecked){
        //check if department already has manager or not
        this.managerService.getAllManagers().subscribe({
          next:(res)=>{
            const isDeptIdMatched = res.some(item => item.department && item.department.deptid === this.employeeRequest.department.deptid);
            if (isDeptIdMatched) {
              this.snackBar.open("Manager for this department already exists!","OK");
            }else {
              this.managerService.addManager(this.employeeRequest).subscribe({
                next:(res)=>{
                  this.snackBar.open("Accepted as Manager","OK");
                  //Update userRole as manager
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
                  this.snackBar.open("Failed accepting request!","OK");
                  console.log(err);
                }
              });
            }
          }
        })
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
    
  }

  denyRequest(employee :any): void {
    this.userService.deleteUser(employee.userid).subscribe({
      next:(res)=>{
        alert("inn")
        this.snackBar.open("Discarded","OK");
        this.ngOnInit();
      },
      error:(err)=>{
        this.ngOnInit();
        console.log(err);
      }
    });
  }


}
