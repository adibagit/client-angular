import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Ticket } from '../models/ticket';
import { Logs } from '../models/logs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  id?: number;
  url:string;

  constructor(private httpClient: HttpClient,private configService : ConfigService) {
    this.url=this.configService.baseURL;
   }

  setId(TicketId?: number){
    this.id = TicketId;
  }

  getAllTickets(): Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(`${this.url}/ticket`);
  }

  addTicket(ticket?: Ticket): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/ticket`,ticket ); 
  }

  getTicketById(id?: number):Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/ticket/${id}`);
  }

  updateTicket(ticket?: Ticket) : Observable<Object>{
    return this.httpClient.put<Object>(`${this.url}/ticket/${this.id}`,ticket);
  }

  deleteTicket(id?: number): Observable<string>{
    return this.httpClient.delete(`${this.url}/ticket?id=${id}`,{ responseType: 'text' });
  }

  getTicketsByUser(userId?: number):Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/getTicketBy/${userId}/user`);
  }

  getTicketsByProperty(propertyId?: number):Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/getTicketBy/${propertyId}/property`);
  }

  getTicketsByStatus(statusId?: number):Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/getTicketBy/${statusId}/status`);
  }

  addLog(log?:Logs): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/log`,log );
  }

  updateTicketStatus(ticketid?:number,statusId?: number) : Observable<Object>{
    return this.httpClient.put<Object>(`${this.url}/changeTicketStatus/${ticketid}/${statusId}`,String);
  }

}
