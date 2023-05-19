import { Component, OnInit } from '@angular/core';
import { SocialAuthService, } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  user : User = new User();
  constructor(
    private socialAuthService: SocialAuthService,
    private userService: UserService, 
    private router:Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    
   }

  myuser:any;
  loggedIn:any;
  loggedInUser:any;

  ngOnInit() {
    this.socialAuthService.authState.subscribe(async (user) => {
      console.log("user:",user);
      this.myuser = user;
      this.loggedIn = (user!=null);


      if(user.email == 'adiba012000@gmail.com'){
        this.manageSession(user.email);
        this.router.navigate(['adminDashboard']);
      }
      
      if(user.email == 'siddiqui.rubab.dcs23@vnsgu.ac.in'){
        this.manageSession(user.email);
        this.router.navigate(['schedulerDashboard']); 
      }
      else if(await this.isExist(user.email)){
          this.httpClient.get(`http://localhost:8080/api/role/${user.email}`, { responseType: 'text' }).subscribe({
            next: (response: string) => {
              console.log(response);
              if(response=='client'){
                this.manageSession(user.email);
                this.router.navigate(['clientDashboard']);
              }else if(response=='employee'){
                this.manageSession(user.email);
                this.router.navigate(['employeeDashboard']);
              }
              
              //redirect to response(userrole) page this.router.navigate(['clientDashboard']);
            },
            error: (error: any) => {
              this.snackBar.open("Something went wrong!!","OK");
              console.error('Error occurred while retrieving user role:', error);
            }
          });
      }else{
        this.user.firstname = user.firstName;
        this.user.lastname = user.lastName;
        this.user.emailid = user.email;
        this.user.picture = user.photoUrl;
        if(this.user.usertype == null){
          this.user.usertype = 'client';
        }
        this.userService.addUser(this.user).subscribe({
          next:(res)=>{
            this.snackBar.open("Registered successfully.","OK");
          },
          error:(err)=>{
            this.snackBar.open("Registeration failed!","OK");
            console.log(err);
          }
        });
        this.router.navigate(['usersetup']);
      }
    });
  } 

  toggleChange(event: MatButtonToggleChange) {
    this.user.usertype=event.value;
    alert('Selected value:'+ this.user.usertype);
    console.log(this.user);
  }

  
  async isExist(email: string): Promise<boolean> {
    const observable = this.userService.userExist(email);
    const result = await firstValueFrom(observable);
    return result as boolean;
  }

   manageSession(email:string){
    this.userService.getUserByEmail(email).subscribe({
      next:(res)=>{
        this.loggedInUser = res;
        sessionStorage.setItem('username', this.loggedInUser[0]["firstname"]);
        sessionStorage.setItem('dp',this.loggedInUser[0]["picture"]);
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong with your session!","OK");
        console.log(err);
      }
    })
   }
  
}

