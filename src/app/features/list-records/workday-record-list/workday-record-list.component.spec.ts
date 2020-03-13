import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkdayRecordListComponent } from './workday-record-list.component';

describe('WorkdayRecordListComponent', () => {
  let component: WorkdayRecordListComponent;
  let fixture: ComponentFixture<WorkdayRecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkdayRecordListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
