import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListManagersComponent } from './list-managers.component';

describe('ListManagersComponent', () => {
  let component: ListManagersComponent;
  let fixture: ComponentFixture<ListManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
