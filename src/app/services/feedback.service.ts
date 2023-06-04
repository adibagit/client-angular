import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  id?: number;
  constructor(private httpClient: HttpClient) { }

  getAllFeedbacks(): Observable<Feedback[]>{
    return this.httpClient.get<Feedback[]>("http://localhost:8080/api/feedback");
  }

  updateFeedback(feedback?: Feedback) : Observable<Object>{
    return this.httpClient.put<Object>(`http://localhost:8080/api/feedback/${this.id}`,feedback);
  }
}
