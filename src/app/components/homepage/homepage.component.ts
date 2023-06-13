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
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  user : User = new User();
  myuser:any;
  loggedInUser:any;
  url:string;

  public loading = false;
  public error = '';
  public success = '';

  constructor(
    private socialAuthService: SocialAuthService,
    private userService: UserService,
    private router:Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private employeeService: EmployeeService,
    private sessionService : SessionService,
    private configService : ConfigService
  ) {
    this.url=this.configService.baseURL;
   }

  ngOnInit() {
    this.url=this.configService.baseURL;
    if(!this.sessionService.isLoggedIn){
      this.socialAuthService.authState.subscribe(async (user) => {
        this.myuser = user;
        this.sessionService.isLoggedIn = (user!=null);
  
        if(user.email == 'adiba012000@gmail.com' || user.email == 'manavvanani@gmail.com' || user.email == 'nehapophalikar21@gmail.com'){
          this.manageSession(user.email);
          sessionStorage.setItem('role','admin');
          this.router.navigate(['adminDashboard']);
        }  
        else if(user.email == 'siddiqui.rubab.dcs23@vnsgu.ac.in' || user.email == 'popanuradha15@gmail.com'){
          this.manageSession(user.email);
          sessionStorage.setItem('role','scheduler');
          this.router.navigate(['schedulerDashboard']);
        }
        else if(await this.isExist(user.email)){
          this.httpClient.get(`${this.url}/role/${user.email}`, { responseType: 'text' }).subscribe({
            next: (response: string) => {
              if(response=='client'){
                this.manageSession(user.email);
                sessionStorage.setItem('role','client');
                this.router.navigate(['clientDashboard']);
              }else if(response=='employee'){
                this.userService.getUserByEmail(user.email).subscribe(async res => {
                  this.myuser = res;
                  if (await this.isEmployeeActive(this.myuser[0]["userid"])) {
                    this.manageSession(user.email);
                    sessionStorage.setItem('role','employee');
                    this.router.navigate(['employeeDashboard']);
                  } else {
                    this.router.navigate(['inactive-employee']);
                  }
                });
              }else{
                this.manageSession(user.email);
                sessionStorage.setItem('role','manager');
                this.router.navigate(['managerDashboard']);
              }
            },
            error: () => {
              this.snackBar.open("Something went wrong!","Dismiss", { duration: 5000 });
            }
            });
        }else{
          this.user.firstname = user.firstName;
          this.user.lastname = user.lastName;
          this.user.emailid = user.email;
          this.user.picture = user.photoUrl;
          this.user.usertype = 'client';
          this.userService.addUser(this.user).subscribe({
            next:()=>{
              this.snackBar.open("Registered successfully.","OK", { duration: 5000 });
              if(this.user.usertype == 'employee'){
                this.manageSession(user.email);
                sessionStorage.setItem('role','employee');
                this.router.navigate(['inactive-employee']);
              }else{
                this.manageSession(user.email);
                sessionStorage.setItem('role','client');
                this.router.navigate(['clientDashboard']);
              }
            },
            error:(err)=>{
              this.snackBar.open("Registeration failed!","OK", { duration: 5000 });
            }
          });
        }
      });
    }
  }

  toggleChange(event: MatButtonToggleChange) {
    this.user.usertype=event.value;
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
        sessionStorage.setItem('lastname', this.loggedInUser[0]["lastname"]);
        sessionStorage.setItem('dp',this.loggedInUser[0]["picture"]);
        sessionStorage.setItem('userid',this.loggedInUser[0]["userid"]);
        location.reload();
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong with your session!","OK", { duration: 5000 });
      }
    })
  }

  sendEmail(e: Event): void {
    e.preventDefault();

    this.loading = true;
    const form = e.target as HTMLFormElement;

    emailjs.sendForm('service_3hdb02u', 'template_m7sd2lj', e.target as HTMLFormElement, 'UmTgyMolRNdWZdeSX')
      .then((response: EmailJSResponseStatus) => {
        this.loading = false;
        alert("Your message has been sent.")
        this.success = 'Your message has been sent. Thank you!';
        location.reload();
      }, (error) => {
        this.loading = false;
        this.error = 'An error occurred while sending the message. Please try again later.';
    });
  }

  addSubscription(e: Event):void{
    alert("Subscription Added. Thank You!")
  }

    

}
