import { Component ,OnInit} from '@angular/core';
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

  constructor(
    private router:Router, 
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getDeptById();
  }
  
  updateDept(){
    this.departmentService.updateDept(this.department).subscribe({
      next:(res)=>{
        this.snackBar.open("Department updated successfully.","OK", { duration: 5000 });
      },
      error:(err)=>{
        this.snackBar.open("Failed updating department!","Dismiss", { duration: 5000 });
      }
    });
  }

  getDeptById(){
    this.departmentService.getDeptById().subscribe(data=>{
      this.department=data; 
    })
  }

}