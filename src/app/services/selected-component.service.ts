import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedComponentService {

  constructor() { }
  // private selectedComponentSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // setSelectedComponent(component: string) {
  //   this.selectedComponentSubject.next(component);
  // }

  // getSelectedComponent() {
  //   return this.selectedComponentSubject.asObservable();
  // }
  private selectedComponent: string='';

  setSelectedComponent(component: string) {
    this.selectedComponent = component;
  }

  getSelectedComponent() {
    return this.selectedComponent;
  }
}
