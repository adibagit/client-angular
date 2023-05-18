import { Component } from '@angular/core';
import { SelectedComponentService } from 'src/app/services/selected-component.service';

@Component({
  selector: 'app-scheduler-dashboard',
  templateUrl: './scheduler-dashboard.component.html',
  styleUrls: ['./scheduler-dashboard.component.css']
})
export class SchedulerDashboardComponent {
  constructor(
    public selectedComponentService: SelectedComponentService,
  ) {}

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
