import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate,Router} from '@angular/router';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {}
  canActivate(): boolean {
    const isLoggedIn = sessionStorage.getItem('role') !== null;

    if(isLoggedIn) {
      return true; //Allow access
    } else {
      this.openAccessDeniedDialog();

      return false; //Block access 
    }
  }

  openAccessDeniedDialog(): void {
    const dialogRef = this.dialog.open(AccessDeniedComponent, {
      width: '300px',
      data: {
        message: 'Please login first!'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['']); // Replace 'login' with the actual login page route
    });
  }
  
}
