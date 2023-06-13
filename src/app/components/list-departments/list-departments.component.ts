import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { UpdateDepartmentComponent } from '../update-department/update-department.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit{
 
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  departments?: Department[];
  displayedColumns: string[] = ['deptname', 'deptdesc', 'lastmodified','actions'];
  dataSource !: MatTableDataSource<any>;
  isLoading = true;

  constructor(
    private departmentService: DepartmentService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.isLoading=true;
    this.getAllDepts();
  }

  getAllDepts(){
    this.isLoading=true;
    this.departmentService.getAllDepartments().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator  = this.paginator;
        this.departments = res;
        this.isLoading=false;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data!","Dismiss", { duration: 5000 });
        this.isLoading=false;
      }
    });
  }

  deleteDept(id?:number){
    this.departmentService.deleteDept(id).subscribe({
      next:(res)=>{
        this.snackBar.open("Department deleted!","OK", { duration: 5000 });
        this.ngOnInit();
      }
    });
  }

  openAddDept(){
    this.dialog.open(AddDepartmentComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openUpdateDept(id:number){
    this.departmentService.setId(id);
    this.dialog.open(UpdateDepartmentComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}