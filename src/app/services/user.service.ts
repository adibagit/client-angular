import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/user';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  id?:number;
  url:string;

  constructor(private httpClient: HttpClient,private configService : ConfigService) { 
    this.url=this.configService.baseURL;
  }

  addUser(user?: User): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/users`,user );
  }

  userExist(email?:string):Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/userExist/${email}`);
  }
  
  getUserRole(email?:string):Observable<string>{
    return this.httpClient.get<string>(`${this.url}/role/${email}`);
  }
  getUser(id:number):Observable<User>{
    return this.httpClient.get<User>(`${this.url}/users/${id}`);
  }

  getUserByEmail(email?:String):Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/userOf/${email}`);
  }

  deleteUser(id?: number): Observable<string>{
    return this.httpClient.delete(`${this.url}/users?id=${id}`,{ responseType: 'text' });
  }

  updateUser(user?: User) : Observable<Object>{
    return this.httpClient.put<Object>(`${this.url}/users/${this.id}`,user);
  }

  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/users`);
  }
  
  getAllManagers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/usersByRole/manager`);
  }

  getAllClients(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/usersByRole/client`);
  }

  getAllEmployees(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.url}/usersByRole/employee`);
  }
}
