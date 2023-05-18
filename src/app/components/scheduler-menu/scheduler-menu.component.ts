import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedComponentService } from 'src/app/services/selected-component.service';


@Component({
  selector: 'app-scheduler-menu',
  templateUrl: './scheduler-menu.component.html',
  styleUrls: ['./scheduler-menu.component.css']
})
export class SchedulerMenuComponent {

  constructor(private router: Router,private selectedComponentService: SelectedComponentService) {}
  navigateToComponent(route: string) {
    this.router.navigate([route]);
  }

  selectComponent(component: string) {
    this.selectedComponentService.setSelectedComponent(component);
  }

}
