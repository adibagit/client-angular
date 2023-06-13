import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  user: any = {
    firstname: '',
    lastname: '',
    emailid: '',
    usertype: ''
  };
  regexPattern: RegExp = /^[a-zA-Z\s]+$/;
  email = new FormControl('', [Validators.required, Validators.email]);
  departments:any;
  employeeRequest : any ={
    user:{userid:''},
    department:{deptid:''}
  }
  addedUser:any;

  constructor(
    private userService : UserService,
    private snackBar: MatSnackBar,
    private deptService : DepartmentService,
    private dialog : MatDialogRef<AddUserComponent>,
    private employeeService : EmployeeService,
    private managerService : ManagerService
  ){}

  ngOnInit(): void {
    this.filterDepartments();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  addUser() {
    if (this.validateForm()) {
      this.userService.addUser(this.user).subscribe({
        next:(res)=>{
          this.addedUser=res;
          this.employeeRequest.user.userid=this.addedUser.userid;
          if(this.user.usertype=='employee'){
            this.employeeService.addEmployee(this.employeeRequest).subscribe({
              next:(result)=>{
                this.snackBar.open("User added successfully.","OK", { duration: 5000 })
              }
            });
          }else{
            this.managerService.addManager(this.employeeRequest).subscribe({
              next:(result)=>{
                this.snackBar.open("User added successfully.","OK", { duration: 5000 })
              }
            });
          }
          this.dialog.close();
        },
        error: (err) => {
          this.snackBar.open("Failed adding user!", "OK", { duration: 5000 });
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.user.firstname || !this.user.lastname || !this.employeeRequest.department.deptid) {
      return false;
    }
    if (!this.regexPattern.test(this.user.firstname) || !this.regexPattern.test(this.user.lastname)) {
      return false;
    }
    return true;
  }

  filterDepartments(): void {
    if (this.user.usertype=='manager') {
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
