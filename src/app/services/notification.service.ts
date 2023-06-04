import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private notificationSubject = new Subject<string>();

  notifyAdmin(message: string): void {
    this.notificationSubject.next(message);
  }

  getNotificationObservable() {
    return this.notificationSubject.asObservable();
  }
}
