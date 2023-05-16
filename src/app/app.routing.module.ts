import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { UpdateDepartmentComponent } from './components/update-department/update-department.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

const routes: Routes = [
  { path : "departments",component : ListDepartmentsComponent},
  { path : "add-department", component : AddDepartmentComponent},
  { path : "update-department", component : UpdateDepartmentComponent},
  { path : "adminHome",component : AdminHomeComponent},
  { path : "adminDashboard",component : AdminDashboardComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
