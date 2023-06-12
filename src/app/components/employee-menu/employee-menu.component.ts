import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { SelectedComponentService } from 'src/app/services/selected-component.service';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.component.html',
  styleUrls: ['./employee-menu.component.css']
})
export class EmployeeMenuComponent implements OnInit {

  deptId:number=Number(sessionStorage.getItem("deptid"));
  manager:any;

  constructor(
    private router: Router,
    private selectedComponentService: SelectedComponentService,
    private managerService : ManagerService
  ) {}

  ngOnInit(): void {
    this.managerService.getManagerByDepartment(this.deptId).subscribe({
      next:(res)=>{
        this.manager=res;
        console.log("Manager",this.manager[0].user.emailid)
      }
    })
  }

  navigateToComponent(route: string) {
    this.router.navigate([route]);
  }

  selectComponent(component: string) {
    this.selectedComponentService.setSelectedComponent(component);
  }
}
