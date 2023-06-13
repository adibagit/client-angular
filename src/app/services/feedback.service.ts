import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Feedback } from '../models/feedback';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  id?: number;
  feedbackId ?: number;
  url:string;

  constructor(private httpClient: HttpClient,private configService : ConfigService) {
    this.url=this.configService.baseURL;
   }

  getAllFeedbacks(): Observable<Feedback[]>{
    return this.httpClient.get<Feedback[]>(`${this.url}/feedback`);
  }

  updateFeedback(feedback?: Feedback) : Observable<Object>{
    return this.httpClient.put<Object>(`${this.url}/feedback/${this.feedbackId}`,feedback);
  }

  addFeedback(feedback?: Feedback): Observable<Object>{
    return this.httpClient.post<Object>(`${this.url}/feedback`,feedback );
  }

  feedbackExist(userId?:number,ticketId?:number):Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.url}/feedbackExist/${userId}/${ticketId}`);
  }

  getFeedbackByUserAndTicket(userId?:number,ticketId?:number):Observable<Object>{
    return this.httpClient.get<Object>(`${this.url}/feedback/${userId}/${ticketId}`);
  }
}
