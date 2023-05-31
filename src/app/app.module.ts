import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { UpdateDepartmentComponent } from './components/update-department/update-department.component';

import { SocialLoginModule, SocialAuthServiceConfig,GoogleLoginProvider} from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { Header2Component } from './components/header2/header2.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { UpdatePropertyComponent } from './components/update-property/update-property.component';
import { ListPropertiesComponent } from './components/list-properties/list-properties.component';
import {MatSelectModule} from '@angular/material/select';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { EmployeeMenuComponent } from './components/employee-menu/employee-menu.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ClientMenuComponent } from './components/client-menu/client-menu.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { ManagerMenuComponent } from './components/manager-menu/manager-menu.component';
import { SchedulerHomeComponent } from './components/scheduler-home/scheduler-home.component';
import { SchedulerDashboardComponent } from './components/scheduler-dashboard/scheduler-dashboard.component';
import { SchedulerMenuComponent } from './components/scheduler-menu/scheduler-menu.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { UpdateEmployeesComponent } from './components/update-employees/update-employees.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { UpdateTicketComponent } from './components/update-ticket/update-ticket.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ListManagersComponent } from './components/list-managers/list-managers.component';
import { UpdateManagerComponent } from './components/update-manager/update-manager.component';
import { InactiveEmployeeComponent } from './components/inactive-employee/inactive-employee.component';
import { EmployeeRequestsComponent } from './components/employee-requests/employee-requests.component';
import {MatBadgeModule} from '@angular/material/badge';
import { AddWorkflowComponent } from './components/add-workflow/add-workflow.component';
import { TrackTicketComponent } from './components/track-ticket/track-ticket.component';
import { ListImagesComponent } from './components/list-images/list-images.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AssignTicketComponent } from './components/assign-ticket/assign-ticket.component';
@NgModule({
  declarations: [
    AppComponent,
    ListDepartmentsComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent,
    HomepageComponent,
    HeaderComponent,
    AdminMenuComponent,
    Header2Component,
    AdminDashboardComponent,
    AdminHomeComponent,
    AddPropertyComponent,
    UpdatePropertyComponent,
    ListPropertiesComponent,
    EmployeeDashboardComponent,
    EmployeeHomeComponent,
    EmployeeMenuComponent,
    ClientDashboardComponent,
    ClientHomeComponent,
    ClientMenuComponent,
    ManagerDashboardComponent,
    ManagerHomeComponent,
    ManagerMenuComponent,
    SchedulerHomeComponent,
    SchedulerDashboardComponent,
    SchedulerMenuComponent,
    UserProfileComponent,
    ListEmployeesComponent,
    UpdateEmployeesComponent,
    AddTicketComponent,
    UpdateTicketComponent,
    ListManagersComponent,
    UpdateManagerComponent,
    InactiveEmployeeComponent,
    EmployeeRequestsComponent,
    AddWorkflowComponent,
    TrackTicketComponent,
    ListImagesComponent,
    AssignTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonToggleModule,
    GoogleSigninButtonModule,
    MatSelectModule,
    MatBadgeModule,
    MatCheckboxModule
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '846299408381-aiusv8bko2kue93bvmprgmbdvv395ou9.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
