import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  userid : number;
  username : string;
  dp : string;

  isLoggedIn = false;
}
