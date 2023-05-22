import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inactive-employee',
  templateUrl: './inactive-employee.component.html',
  styleUrls: ['./inactive-employee.component.css']
})
export class InactiveEmployeeComponent {
  constructor(private router: Router) {}
  goToHomePage() {
    this.router.navigate(['/homepage']);
  }

  @ViewChild('checkmarkSvg') checkmarkSvg!: ElementRef<SVGSVGElement>;

  playAnimation() {
    const svgElement = this.checkmarkSvg.nativeElement;
    // Trigger the animation by adding a CSS class
    svgElement.classList.add('animate');
  }
}
