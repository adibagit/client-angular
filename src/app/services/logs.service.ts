import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  statusId?: number;
  employeeId?: number;
  url:string;

  constructor(private httpClient: HttpClient,private configService : ConfigService) {
    this.url=this.configService.baseURL;
  }

  getlogsByEmployee(employeeId?: number,statusId?:number):Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/logsByEmployee/${employeeId}/${statusId}`);
  }

}
