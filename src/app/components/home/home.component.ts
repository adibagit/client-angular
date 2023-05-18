import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser, } from '@abacritt/angularx-social-login';
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

  ngOnInit() {
    this.socialAuthService.authState.subscribe(async (user) => {
      console.log("user:",user);
      this.myuser = user;
      this.loggedIn = (user!=null);


      if(user.email == 'adiba012000@gmail.com'){
        this.router.navigate(['adminDashboard']);
      }
      else if(await this.isExist(user.email)){
          this.httpClient.get(`http://localhost:9001/api/role/${user.email}`, { responseType: 'text' }).subscribe({
            next: (response: string) => {
              //alert(response);
              console.log(response);
              if(response=='client'){
                this.router.navigate(['usersetup']);
              }else{
                alert("Redirect to employee")
              }
              
              //redirect to response(userrole) page this.router.navigate(['clientDashboard']);
            },
            error: (error: any) => {
              this.snackBar.open("Something went wrong!","OK");
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

  // isExist(email: string): boolean {
  //   let exist = false;
  //   this.userService.userExist(email).subscribe((response: boolean) => {
  //     exist = response;
  //   });
  //   return exist;
  // }


  async isExist(email: string): Promise<boolean> {
    const observable = this.userService.userExist(email);
    const result = await firstValueFrom(observable);
    return result as boolean;
  }
  
  
  // isExist(email:string): boolean{
  //   return this.userService.userExist(email).subscribe();
  // }
  
  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  // logOut(): void {
  //   this.socialAuthService.signOut(); 
  // }

}

// signInWithGoogle(): void {
//   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
//     alert("hi there");
//     alert("User:"+user);
//     alert(user.authToken);
//     alert(user.email);
//     alert(user.firstName);
//     alert(user.photoUrl);
//     console.log(user);

//   }).catch(error => {
//     alert("failed");
//     console.log(error)
//   });
// }

  // email: string ="";
  // password: string="";

  // constructor(private http: HttpClient, private router: Router) {}

  // onSubmit() {
  //   const url = 'http://localhost:8080/api/authenticate';
  //   const body = { email: this.email, password: this.password };

  //   this.http.post<any>(url, body).subscribe(
  //     data => {
  //       localStorage.setItem('token', data.token);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
