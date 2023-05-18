import { Component } from '@angular/core';
import { SelectedComponentService } from 'src/app/services/selected-component.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {
  constructor(
    public selectedComponentService: SelectedComponentService,
  ) {}

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
