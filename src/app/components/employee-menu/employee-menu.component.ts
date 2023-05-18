import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedComponentService } from 'src/app/services/selected-component.service';

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.component.html',
  styleUrls: ['./employee-menu.component.css']
})
export class EmployeeMenuComponent {

  constructor(private router: Router,private selectedComponentService: SelectedComponentService) {}
  navigateToComponent(route: string) {
    this.router.navigate([route]);
  }

  selectComponent(component: string) {
    this.selectedComponentService.setSelectedComponent(component);
  }
}
