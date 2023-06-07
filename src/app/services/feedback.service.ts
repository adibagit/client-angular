import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  id?: number;
  feedbackId ?: number;
  constructor(private httpClient: HttpClient) { }

  getAllFeedbacks(): Observable<Feedback[]>{
    return this.httpClient.get<Feedback[]>("http://localhost:8080/api/feedback");
  }

  updateFeedback(feedback?: Feedback) : Observable<Object>{
    return this.httpClient.put<Object>(`http://localhost:8080/api/feedback/${this.feedbackId}`,feedback);
  }

  addFeedback(feedback?: Feedback): Observable<Object>{
    return this.httpClient.post<Object>("http://localhost:8080/api/feedback",feedback );
  }

  feedbackExist(userId?:number,ticketId?:number):Observable<boolean>{
    return this.httpClient.get<boolean>(`http://localhost:8080/api/feedbackExist/${userId}/${ticketId}`);
  }

  getFeedbackByUserAndTicket(userId?:number,ticketId?:number):Observable<Object>{
    return this.httpClient.get<Object>(`http://localhost:8080/api/feedback/${userId}/${ticketId}`);
  }
}
