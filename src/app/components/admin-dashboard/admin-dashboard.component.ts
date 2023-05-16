  import { Component,OnInit, ComponentFactoryResolver,AfterViewInit, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
  import { SelectedComponentService } from 'src/app/services/selected-component.service';
  import { AdminHomeComponent } from '../admin-home/admin-home.component';
  import { ListDepartmentsComponent } from '../list-departments/list-departments.component';
  import { Subscription } from 'rxjs';

  @Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
  })
  export class AdminDashboardComponent implements OnInit{

    selectedComponent = this.selectedComponentService.getSelectedComponent();
    adminhome = false;
    listdept=false;
    private subscription ?: Subscription;

    private componentRef: ComponentRef<any> | null = null; 
    @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer !: ViewContainerRef;
    constructor(
      public selectedComponentService: SelectedComponentService,
      // private componentFactoryResolver: ComponentFactoryResolver
    ) {}
    ngOnInit(): void {
      // this.subscription = this.selectedComponentService.getSelectedComponent().subscribe(component => {
      //   this.selectedComponent = component;
      //   if (this.selectedComponent === 'AdminHomeComponent') {
      //     this.adminhome = true;
      //   } else if (this.selectedComponent === 'ListDepartmentsComponent') {
      //     this.listdept = true;
      //   }
      // });
      // alert(this.selectedComponentService.getSelectedComponent());
      // this.selectedComponent ='AdminHomeComponent';
      // if(this.selectedComponent == 'AdminHomeComponent'){
      //   this.adminhome = true;
      // }else if(this.selectedComponent == 'ListDepartmentsComponent'){
      //   this.listdept = true;
      // } 
      // this.selectedComponent = this.selectedComponentService.getSelectedComponent(); 
      // alert( this.selectedComponentService.getSelectedComponent());
      // alert(this.selectedComponent);
    }

  loadSelectedComponent() {
    // const selectedComponent = this.selectedComponentService.getSelectedComponent();
    // if (selectedComponent) {
    //   this.componentContainer.clear();
    //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(selectedComponent);
    //   this.componentContainer.createComponent(componentFactory);
    // }

    // if (this.componentRef) {
    //   this.componentRef.destroy();
    // }

    // const selectedComponent = this.selectedComponentService.getSelectedComponent();
    // if (selectedComponent === 'adminHome') {
    //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AdminHomeComponent);
    //   this.componentRef = this.componentContainer.createComponent(componentFactory);
    // } else if (selectedComponent === 'departments') {
    //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ListDepartmentsComponent );
    //   this.componentRef = this.componentContainer.createComponent(componentFactory);
    // }
    
    // let componentType: any = null;

    // if (selectedComponent === 'AdminHomeComponent') {
    //   componentType = AdminHomeComponent;
    // } else if (selectedComponent === 'ListDepartmentsComponent') {
    //   componentType = ListDepartmentsComponent;
    // }
    // Add conditions for other component types as needed

    // if (componentType) {
    //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    //   // Clear previous component if exists
    //   if (this.componentRef) {
    //     this.componentRef.destroy();
    //   }

    //   this.componentRef = this.componentContainer.createComponent(componentFactory);
    // }
  }


  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
