import { Component} from '@angular/core';
import { SelectedComponentService } from 'src/app/services/selected-component.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  
  constructor(
    public selectedComponentService: SelectedComponentService,
  ) {}

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
