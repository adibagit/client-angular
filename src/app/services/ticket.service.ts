import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  id?: number;
  constructor(private httpClient: HttpClient) { }

  setId(propId?: number){
    this.id = propId;
  }

  getAllTickets(): Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>("http://localhost:8080/api/ticket");
  }

  addTicket(ticket?: Ticket): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/ticket",ticket ); 
  }

  getTicketById():Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/ticket/${this.id}`);
  }

  updateTicket(ticket?: Ticket) : Observable<Object>{
    return this.httpClient.put<Object>(`http://localhost:8080/api/ticket/${this.id}`,ticket);
  }

  deleteTicket(id?: number): Observable<Object>{
    return this.httpClient.delete<Object>(`http://localhost:8080/api/ticket?id=${id}`);
  }

  getTicketsByUser(userId?: number):Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/getTicketBy/${userId}/user`);
  }

  getTicketsByProperty(propertyId?: number):Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/getTicketBy/${propertyId}/property`);
  }

  getTicketsByStatus(statusId?: number):Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/getTicketBy/${statusId}/status`);
  }
}
