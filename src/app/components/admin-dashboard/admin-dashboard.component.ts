  import { Component } from '@angular/core';
  import { SelectedComponentService } from 'src/app/services/selected-component.service';

  @Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
  })
  export class AdminDashboardComponent {

  
    constructor(
      public selectedComponentService: SelectedComponentService,
    ) {}

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
