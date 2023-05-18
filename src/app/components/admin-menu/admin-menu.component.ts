import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedComponentService } from 'src/app/services/selected-component.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent {
  constructor(private router: Router,private selectedComponentService: SelectedComponentService) {}

  navigateToComponent(route: string) {
    this.router.navigate([route]);
  }

  selectComponent(component: string) {
    this.selectedComponentService.setSelectedComponent(component);
  }

}
