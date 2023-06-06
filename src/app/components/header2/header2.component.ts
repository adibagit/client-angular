import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  // username = sessionStorage.getItem('username');
  // picture = sessionStorage.getItem('dp');
  username :any;
  picture :any;
  constructor(private router: Router,private sessionService : SessionService) {
  
  }

  ngOnInit(): void {
    // alert("inheader2 +"+sessionStorage.getItem('username'))
    // alert("inheader2 +"+sessionStorage.getItem('dp'))
    this.username = sessionStorage.getItem('username');
    this.picture = sessionStorage.getItem('dp');
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  

  logOut(): void {
    //this.socialAuthService.signOut(); 
    sessionStorage.clear();
    this.sessionService.isLoggedIn=false;
    this.router.navigate(['']); 
  }
}
