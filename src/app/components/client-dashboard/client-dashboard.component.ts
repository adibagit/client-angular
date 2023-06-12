import { Component } from '@angular/core';
import { SelectedComponentService } from 'src/app/services/selected-component.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent {

  sideBarOpen = true;
  
  constructor(
    public selectedComponentService: SelectedComponentService,
  ) {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
