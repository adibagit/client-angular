import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  isEmployee: boolean = false;
  

  user : User = new User();
  constructor(
    private socialAuthService: SocialAuthService,
    private userService: UserService, 
    private router:Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private employeeService: EmployeeService,
    private sessionService : SessionService
  ) { }

  myuser:any;
  // loggedIn:boolean = false;
  loggedInUser:any;

  ngOnInit() {
    if(!this.sessionService.isLoggedIn){
      this.socialAuthService.authState.subscribe(async (user) => {
        console.log("user:",user);
        this.myuser = user;
        this.sessionService.isLoggedIn = (user!=null);
  
        if(user.email == 'adiba012000@gmail.com'){
          this.manageSession(user.email);
          this.router.navigate(['adminDashboard']);
        }  
        else if(user.email == 'siddiqui.rubab.dcs23@vnsgu.ac.in'){
          this.manageSession(user.email);+
          this.router.navigate(['schedulerDashboard']);
        }
        else if(await this.isExist(user.email)){ //User already exists, so just redirect him
          this.httpClient.get(`http://localhost:8080/api/role/${user.email}`, { responseType: 'text' }).subscribe({
            next: (response: string) => {
              if(response=='client'){
                this.manageSession(user.email);
                this.router.navigate(['clientDashboard']);
              }else if(response=='employee'){
                //check if this emp active or not
                this.userService.getUserByEmail(user.email).subscribe(async res => {
                  this.myuser = res;
                  if (await this.isEmployeeActive(this.myuser[0]["userid"])) {
                    // alert(this.myuser[0]["userid"]);
                    this.manageSession(user.email);
                    this.router.navigate(['employeeDashboard']);
                  } else {
                    this.router.navigate(['inactive-employee']);
                  }
                });                                          
              }else{ //the user is manager
                this.manageSession(user.email);
                this.router.navigate(['managerDashboard']);
              } 
            },
            error: (error: any) => {
              this.snackBar.open("Something went wrong!!","OK");
              console.error('Error occurred while retrieving user role:', error);
            }
            });
        }else{  //Insert user if not exist in database
          this.user.firstname = user.firstName;
          this.user.lastname = user.lastName;
          this.user.emailid = user.email;
          this.user.picture = user.photoUrl;
          if (this.isEmployee) {
            this.user.usertype = 'employee';
          }
          this.userService.addUser(this.user).subscribe({
            next:()=>{
              this.manageSession(user.email);
              this.snackBar.open("Registered successfully.","OK");
              if(this.user.usertype == 'employee'){
                //this.notificationService.notifyAdmin('Request sent! New Employee arrived!'); 
                this.router.navigate(['inactive-employee']);
              }else{
                this.router.navigate(['clientDashboard']);
              }
            },
            error:(err)=>{
              this.snackBar.open("Registeration failed!","OK");
              console.log(err);
            }
          });
        }
        
      });
    }
  } 

  toggleChange(event: MatButtonToggleChange) {
    this.user.usertype=event.value;
    // alert('Selected value:'+ this.user.usertype);
    console.log(this.user);
  }

  
  async isExist(email: string): Promise<boolean> {
    const observable = this.userService.userExist(email);
    const result = await firstValueFrom(observable);
    return result as boolean;
  }

  async isEmployeeActive(userId: number): Promise<boolean> {
    const observable = this.employeeService.isActive(userId);
    const result = await firstValueFrom(observable);
    return result as boolean;
  }

  manageSession(email:string){
    this.userService.getUserByEmail(email).subscribe({
      next:(res)=>{
        this.loggedInUser = res;
        sessionStorage.setItem('username', this.loggedInUser[0]["firstname"]);
        sessionStorage.setItem('dp',this.loggedInUser[0]["picture"]);
        sessionStorage.setItem('userid',this.loggedInUser[0]["userid"]);
        // alert("from hoimepage"+sessionStorage.getItem('username'))
        // alert("from hoimepage"+sessionStorage.getItem('dp'))
        // alert("before reload "+this.sessionService.isLoggedIn)
        location.reload();
        // alert("after reload "+this.sessionService.isLoggedIn)
        // this.sessionService.userid = this.loggedInUser[0]["userid"];
        // this.sessionService.username = this.loggedInUser[0]["firstname"];
        // this.sessionService.dp = this.loggedInUser[0]["dp"];
        // console.log("from homepage: manage session: username - ",this.loggedInUser[0]["firstname"])
        // console.log("from homepage: manage session: service username - ",this.sessionService.username)
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong with your session!","OK");
        console.log(err);
      }
    })
  }
}
