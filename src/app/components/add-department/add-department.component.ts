import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {

  department: Department = new Department();

  constructor(private departmentService : DepartmentService, private router:Router,private snackBar: MatSnackBar){}

  addDept(){
    console.log(this.department)
    this.departmentService.addDepartment(this.department).subscribe({
      next:(res)=>{
        this.snackBar.open("Department added successfully. Please Refresh! ","OK");
      },
      error:(err)=>{
        this.snackBar.open("Failed adding department!","OK");
      }
    });
    this.router.navigate(['adminDashboard']); 
  }
}
