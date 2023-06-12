import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedComponentService } from 'src/app/services/selected-component.service';


@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.css']
})
export class ClientMenuComponent {

  constructor(private router: Router,private selectedComponentService: SelectedComponentService) {}
  
  navigateToComponent(route: string) {
    this.router.navigate([route]);
  }

  selectComponent(component: string,status: string) {
    this.selectedComponentService.setStatus(status);
    this.selectedComponentService.setSelectedComponent(component);
  }

}
