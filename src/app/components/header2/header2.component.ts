import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  username = localStorage.getItem('username');
  picture = localStorage.getItem('dp');
  
  constructor(private router: Router,private socialAuthService: SocialAuthService) {
  
  }

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  

  logOut(): void {
    this.socialAuthService.signOut(); 
    sessionStorage.clear();
    this.router.navigate(['']); 
  }
}
