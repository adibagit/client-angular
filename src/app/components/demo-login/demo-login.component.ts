import { Component, NgZone, OnInit ,AfterViewInit} from '@angular/core';

declare const gapi: any;
@Component({
  selector: 'app-demo-login',
  templateUrl: './demo-login.component.html',
  styleUrls: ['./demo-login.component.css']
})
export class DemoLoginComponent implements OnInit,AfterViewInit{
  constructor(private ngZone: NgZone){}

  ngOnInit(): void {
    this.renderGoogleSignInButton();
  }

  ngAfterViewInit(): void {
    this.renderGoogleSignInButton();
  }

  renderGoogleSignInButton(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '846299408381-aiusv8bko2kue93bvmprgmbdvv395ou9.apps.googleusercontent.com'
      }).then(() => {
        gapi.signin2.render('customGoogleSignBtn', {
          scope: 'email',
          width: 240,
          height: 50,
          longtitle: true,
          theme: 'dark',
          onsuccess: this.onGoogleSignIn.bind(this),
          onfailure: this.onGoogleSignInFailure.bind(this)
        });
      });
    });
  }

  onGoogleSignIn(googleUser: any): void {
    const profile = googleUser.getBasicProfile();
    const email = profile.getEmail();
    this.ngZone.run(() => {
      // Handle the signed-in user here
      // For example, you can redirect the user to a dashboard page based on their role
      // You can access the user's email using `email`
    });
  }
  
  onGoogleSignInFailure(error: any): void {
    console.log('Google Sign-In failed:', error);
  }
  
  
  
}
