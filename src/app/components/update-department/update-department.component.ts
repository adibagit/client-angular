import { Component ,Inject,OnInit} from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit{
   
  department: Department = new Department();

  ngOnInit(): void {
    this.getDeptById();

  }
  constructor(private router:Router, private departmentService: DepartmentService,private snackBar: MatSnackBar){}
  updateDept(){
    this.departmentService.updateDept(this.department).subscribe({
      next:(res)=>{
        //alert('Department updated successfully. ')
        this.snackBar.open("Department updated successfully. Please Refresh!","OK");
        //window.location.reload();
      },
      error:(err)=>{
        //alert("Failed to update the Department!")
        this.snackBar.open("Failed updating department!","OK");
      }
    });
    //this.router.navigate(['departments']);
    //window.location.reload();
  }

  getDeptById(){
    this.departmentService.getDeptById().subscribe(data=>{
      this.department=data; 
    })
  }
}
