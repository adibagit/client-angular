import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit{

  departments?: Department[];

  constructor(private departmentService: DepartmentService, private router: Router){}

  ngOnInit(): void {
    // this.departments=[
    //   {
    //     deptid : 1,
    //     deptname : "NgDept",
    //     deptdesc : "Blah Blah",
    //     lastmodified : new Date(2012, 1, 20)
    //   },
    //   {
    //     deptid : 2,
    //     deptname : "Water ",
    //     deptdesc : "Blah Blah",
    //     lastmodified : new Date(2022, 9, 22)
    //   }
    // ];
    this.getAllDepts();
  }

  getAllDepts(){
    this.departmentService.getAllDepartments().subscribe(data=>{
      this.departments = data;
    });
  }

  editDept(id?: number){
    this.departmentService.setId(id);
    this.router.navigate(['update-department']); 
  }

  deleteDept(id?:number){
    this.departmentService.deleteDept(id).subscribe();
    this.router.navigate(['departments']);
    window.location.reload();
  }
}
