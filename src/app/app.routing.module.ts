import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { UpdateDepartmentComponent } from './components/update-department/update-department.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ListPropertiesComponent } from './components/list-properties/list-properties.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { UpdatePropertyComponent } from './components/update-property/update-property.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { SchedulerDashboardComponent } from './components/scheduler-dashboard/scheduler-dashboard.component';
import { ListManagersComponent } from './components/list-managers/list-managers.component';
import { UpdateManagerComponent } from './components/update-manager/update-manager.component';
import { InactiveEmployeeComponent } from './components/inactive-employee/inactive-employee.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path : "departments",component : ListDepartmentsComponent, canActivate: [AuthGuard]},
  { path : "add-department", component : AddDepartmentComponent, canActivate: [AuthGuard]},
  { path : "update-department", component : UpdateDepartmentComponent, canActivate: [AuthGuard]},
  { path : "adminDashboard",component : AdminDashboardComponent, canActivate: [AuthGuard]},
  { path : "properties",component : ListPropertiesComponent, canActivate: [AuthGuard]},
  { path : "add-property", component : AddPropertyComponent, canActivate: [AuthGuard]},
  { path : "update-property", component : UpdatePropertyComponent, canActivate: [AuthGuard]},
  { path : "employeeDashboard",component : EmployeeDashboardComponent, canActivate: [AuthGuard]},
  { path : "clientDashboard",component : ClientDashboardComponent, canActivate: [AuthGuard]},
  { path : "managerDashboard",component : ManagerDashboardComponent, canActivate: [AuthGuard]},
  { path : "schedulerDashboard",component : SchedulerDashboardComponent, canActivate: [AuthGuard]},
  { path : "managers",component : ListManagersComponent, canActivate: [AuthGuard]},
  {path : "update-manager",component : UpdateManagerComponent, canActivate: [AuthGuard]},
  {path : "inactive-employee",component : InactiveEmployeeComponent},
  {path : "list-ticket",component : ListTicketsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
