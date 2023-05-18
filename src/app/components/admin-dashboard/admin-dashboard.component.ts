  import { Component,ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
  import { SelectedComponentService } from 'src/app/services/selected-component.service';
  import { Subscription } from 'rxjs';

  @Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
  })
  export class AdminDashboardComponent {

    selectedComponent = this.selectedComponentService.getSelectedComponent();
    adminhome = false;
    listdept=false;
    private subscription ?: Subscription;

    private componentRef: ComponentRef<any> | null = null; 
    @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer !: ViewContainerRef;
    constructor(
      public selectedComponentService: SelectedComponentService,
    ) {}

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
