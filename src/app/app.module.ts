import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule,ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
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
import { HomeComponent } from './components/home/home.component';
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
@NgModule({
  declarations: [
    AppComponent,
    ListTicketsComponent,
    ListDepartmentsComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent,
    HomeComponent,
    HeaderComponent,
    AdminMenuComponent,
    Header2Component,
    AdminDashboardComponent,
    AdminHomeComponent,
    AddPropertyComponent,
    UpdatePropertyComponent,
    ListPropertiesComponent
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
    GoogleSigninButtonModule
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
