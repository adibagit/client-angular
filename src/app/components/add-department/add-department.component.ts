import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit{

  department: Department = new Department();

  constructor(private departmentService : DepartmentService, private router:Router){}
  ngOnInit(): void {
    
  }

  addDept(){
    console.log(this.department)
    this.departmentService.addDepartment(this.department).subscribe();
    this.router.navigate(['departments']); 
  }
}
