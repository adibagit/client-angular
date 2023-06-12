import { Component } from '@angular/core';
import { SelectedComponentService } from 'src/app/services/selected-component.service';

@Component({
  selector: 'app-scheduler-dashboard',
  templateUrl: './scheduler-dashboard.component.html',
  styleUrls: ['./scheduler-dashboard.component.css']
})
export class SchedulerDashboardComponent {

  sideBarOpen = true;
  
  constructor(
    public selectedComponentService: SelectedComponentService,
  ) {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
