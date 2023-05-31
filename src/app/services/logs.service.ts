import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Logs } from '../models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private httpClient: HttpClient) {}


}
