import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedComponentService {

  constructor() { }
  
  private selectedComponent: string='';

  setSelectedComponent(component: string) {
    this.selectedComponent = component;
  }

  getSelectedComponent() {
    return this.selectedComponent;
  }
}
