import { Component ,OnInit} from '@angular/core';
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
  constructor(private router:Router, private departmentService: DepartmentService){}
  updateDept(){
    this.departmentService.updateDept(this.department).subscribe();
    this.router.navigate(['departments']);
  }

  getDeptById(){
    this.departmentService.getDeptById().subscribe(data=>{
      this.department=data;
    })
  }
}
