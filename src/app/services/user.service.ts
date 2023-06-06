import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  id?:number;
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

  deleteUser(id?: number): Observable<string>{
    return this.httpClient.delete(`http://localhost:8080/api/users?id=${id}`,{ responseType: 'text' });
  }

  updateUser(user?: User) : Observable<Object>{
    return this.httpClient.put<Object>(`http://localhost:8080/api/users/${this.id}`,user);
  }

  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:8080/api/users");
  }
  
  getAllManagers(): Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:8080/api/usersByRole/manager");
  }

  getAllClients(): Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:8080/api/usersByRole/client");
  }

  getAllEmployees(): Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:8080/api/usersByRole/employee");
  }
}
