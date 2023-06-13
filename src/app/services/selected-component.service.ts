import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedComponentService {
  
  private selectedComponent: string='';
  private status: BehaviorSubject<string> = new BehaviorSubject<string>('all');

  setSelectedComponent(component: string) {
    this.selectedComponent = component;
  }

  getSelectedComponent() {
    return this.selectedComponent;
  }

  getStatus() {
    return this.status.asObservable();
  }

  setStatus(status: string) {
    this.status.next(status);
  }
}
