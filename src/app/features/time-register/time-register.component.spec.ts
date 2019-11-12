import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRegisterComponent } from './time-register.component';

describe('TimeRegisterComponent', () => {
  let component: TimeRegisterComponent;
  let fixture: ComponentFixture<TimeRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
