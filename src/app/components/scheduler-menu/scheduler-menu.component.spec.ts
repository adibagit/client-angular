import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerMenuComponent } from './scheduler-menu.component';

describe('SchedulerMenuComponent', () => {
  let component: SchedulerMenuComponent;
  let fixture: ComponentFixture<SchedulerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
