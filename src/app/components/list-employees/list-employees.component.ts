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

  constructor(
    private empService: EmployeeService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllProps();
    this.empService.getEmployeeRequest().subscribe({
      next:(res)=>{
        this.noOfEmployeeRequest = res.length;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });
  }

  getAllProps(){
    this.empService.getAllEmployees().subscribe({
      next:(res)=>{
        this.employee = res;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });
  }

  deleteEmp(id?:number){
    this.empService.deleteEmp(id).subscribe({
      next:(res)=>{
        this.snackBar.open("Employee deleted!","OK");
        this.ngOnInit();
      },
      error:(err)=>{
        this.snackBar.open("Failed to delete employee","OK");
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