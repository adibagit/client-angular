import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateEmployeesComponent } from '../update-employees/update-employees.component';
import { EmployeeRequestsComponent } from '../employee-requests/employee-requests.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent {

  employee: any = {
    empid: '',
    user: {firstname:'',lastname:'',emailid:'',phoneno:'',picture:''},
    department: {deptname:''},
  };
  noOfEmployeeRequest : number;
  isLoading = true;

  constructor(
    private empService: EmployeeService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllProps();
    this.getEmployeeRequests();
  }

  getAllProps(){
    this.isLoading=true;
    this.empService.getAllEmployees().subscribe({
      next:(res)=>{
        this.employee = res;
        this.isLoading=false;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data!","OK", { duration: 5000 });
        this.isLoading=false;
      }
    });
  }

  getEmployeeRequests(){
    this.empService.getEmployeeRequest().subscribe({
      next:(res)=>{
        this.noOfEmployeeRequest = res.length;
        this.isLoading=false;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data!","OK", { duration: 5000 });
        this.isLoading=false;
      }
    });
  }

  deleteEmp(id?:number){
    this.empService.deleteEmp(id).subscribe({
      next:(res)=>{
        this.snackBar.open("Employee deleted!","OK", { duration: 5000 });
        this.ngOnInit();
      },
      error:(err)=>{
        this.snackBar.open("Failed to delete employee","Dismiss", { duration: 5000 });
        this.ngOnInit();
      }
    });
  }

  openAddEmployeeRequest(){
    this.dialog.open(EmployeeRequestsComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openAddUser(){
    this.dialog.open(AddUserComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openUpdateEmp(id:number){
    this.empService.setId(id);
    this.dialog.open(UpdateEmployeesComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

}