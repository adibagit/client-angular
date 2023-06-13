import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from 'src/app/services/department.service';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.css']
})
export class UpdateManagerComponent implements OnInit {

  manager: any = {
    department: {deptid:''}
  };
  departments?:any;

  constructor(
    private managerService: ManagerService,
    private snackBar: MatSnackBar,
    private deptService: DepartmentService
  ){}

  ngOnInit(): void {
    this.getManagerById();
    this.deptService.getAllDepartments().subscribe({
      next:(res)=>{
        this.departments = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong!","Dismiss", { duration: 5000 });
      }
    });
  }
  
  updateManager(){
    this.managerService.updateManager(this.manager).subscribe({
      next:(res)=>{
        this.snackBar.open("Manager updated successfully.","OK", { duration: 5000 });
      },
      error:(err)=>{
        this.snackBar.open("Failed updating Manager!","Dismiss", { duration: 5000 });
      }
    });
  }

  getManagerById(){
    this.managerService.getManagerById().subscribe(data=>{
      this.manager=data; 
    })
  }

}