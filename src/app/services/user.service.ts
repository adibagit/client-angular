import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  addUser(user?: User): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/users",user );
  }

  userExist(email?:string):Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/userExist/${email}`);
  }
  
  getUserRole(email?:string):Observable<string>{
    return this.httpClient.get<string>(`http://localhost:8080/api/role/${email}`);
  }
  getUser(id:number):Observable<User>{
    return this.httpClient.get<User>(`http://localhost:8080/api/users/${id}`);
  }

  getUserByEmail(email?:String):Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/userOf/${email}`);
  }
}
