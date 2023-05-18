import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddPropertyComponent } from '../add-property/add-property.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateEmployeesComponent } from '../update-employees/update-employees.component';

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

  constructor(private empService: EmployeeService,private dialog:MatDialog,private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.getAllProps();
  }

  getAllProps(){
    this.empService.getAllEmployees().subscribe({
      next:(res)=>{
        // this.dataSource = new MatTableDataSource(res);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator  = this.paginator;
        this.employee = res;
        console.log(this.employee)
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });
  }

  deleteEmp(id?:number){
    //this.departmentService.deleteDept(id).subscribe();
    this.empService.deleteEmp(id).subscribe({
      next:(res)=>{
        this.snackBar.open("Employee deleted!","OK");
        //this.getAllProps();
      },
      error:(err)=>{
        console.log(err);
        // this.snackBar.open("Failed deleting property!","OK");
        this.snackBar.open("Employee deleted!","OK");
      }
    });
    //this.router.navigate(['departments']);
    //window.location.reload();
  }

  openAddEmp(){
    this.dialog.open(AddPropertyComponent);
  }

  openUpdateEmp(id:number){
    //this.dialog.open(AddDepartmentComponent,{data});
    this.empService.setId(id);
   // this.router.navigate(['update-department']); 
    this.dialog.open(UpdateEmployeesComponent);
  }

}
