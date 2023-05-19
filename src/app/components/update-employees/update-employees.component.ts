import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employees',
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.css']
})
export class UpdateEmployeesComponent implements OnInit{
  employee: any = {
    department: {deptid:''}
  };
  departments?:any;

  constructor(private empService: EmployeeService,private snackBar: MatSnackBar,private deptService: DepartmentService){}

  ngOnInit(): void {
    this.getEmpById();

    this.deptService.getAllDepartments().subscribe({
      next:(res)=>{
        console.log(res)
       this.departments = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong! Try restarting the server.","OK");
        console.log(err);
      }
    });

  }
  
  updateEmp(){
    this.empService.updateEmp(this.employee).subscribe({
      next:(res)=>{
        this.snackBar.open("Employee updated successfully. Please Refresh!","OK");
      },
      error:(err)=>{
        console.log(err);
        this.snackBar.open("Failed updating employee!","OK");
      }
    });
  }

  getEmpById(){
    this.empService.getEmpById().subscribe(data=>{
      this.employee=data; 
    })
  }


}
