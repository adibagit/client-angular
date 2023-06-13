import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseURL:string="http://localhost:8080/api";
}
