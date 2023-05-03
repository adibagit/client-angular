import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { UpdateDepartmentComponent } from './components/update-department/update-department.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path : "departments",component : ListDepartmentsComponent},
  { path : "", component: HomeComponent},
  // { path : "", redirectTo : "departments", pathMatch : 'full'},
  { path : "add-department", component : AddDepartmentComponent},
  { path : "update-department", component : UpdateDepartmentComponent},
  { path : "login",component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
