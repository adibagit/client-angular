import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { UpdateDepartmentComponent } from './components/update-department/update-department.component';
import { HomeComponent } from './components/home/home.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ListPropertiesComponent } from './components/list-properties/list-properties.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { UpdatePropertyComponent } from './components/update-property/update-property.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { SchedulerDashboardComponent } from './components/scheduler-dashboard/scheduler-dashboard.component';
import { ListManagersComponent } from './components/list-managers/list-managers.component';
import { UpdateManagerComponent } from './components/update-manager/update-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path : "departments",component : ListDepartmentsComponent},
  { path : "add-department", component : AddDepartmentComponent},
  { path : "update-department", component : UpdateDepartmentComponent},
  { path : "adminHome",component : AdminHomeComponent},
  { path : "adminDashboard",component : AdminDashboardComponent},
  { path : "properties",component : ListPropertiesComponent},
  { path : "add-property", component : AddPropertyComponent},
  { path : "update-property", component : UpdatePropertyComponent},
  { path : "employeeDashboard",component : EmployeeDashboardComponent},
  { path : "clientDashboard",component : ClientDashboardComponent},
  { path : "managerDashboard",component : ManagerDashboardComponent},
  { path : "schedulerDashboard",component : SchedulerDashboardComponent},
  { path : "homepage",component : HomepageComponent},
  { path : "managers",component : ListManagersComponent},
  {path : "update-manager",component : UpdateManagerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
