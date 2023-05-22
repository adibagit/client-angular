import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveEmployeeComponent } from './inactive-employee.component';

describe('InactiveEmployeeComponent', () => {
  let component: InactiveEmployeeComponent;
  let fixture: ComponentFixture<InactiveEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactiveEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
