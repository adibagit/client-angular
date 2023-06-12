import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inactive-employee',
  templateUrl: './inactive-employee.component.html',
  styleUrls: ['./inactive-employee.component.css']
})
export class InactiveEmployeeComponent {

  @ViewChild('checkmarkSvg') checkmarkSvg!: ElementRef<SVGSVGElement>;
  
  constructor(private router: Router) {}

  goToHomePage() {
    this.router.navigate(['/homepage']);
  }

  playAnimation() {
    const svgElement = this.checkmarkSvg.nativeElement;
    svgElement.classList.add('animate');
  }
}
