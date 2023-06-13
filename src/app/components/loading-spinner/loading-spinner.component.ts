import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
  animations: [
    trigger('spinAnimation', [
      transition(':enter', [
        style({ transform: 'rotate(0deg)' }),
        animate('1s linear', style({ transform: 'rotate(360deg)' }))
      ])
    ])
  ]
})
export class LoadingSpinnerComponent {

}
