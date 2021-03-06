import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PeriodNavComponent } from "./period-nav.component";

describe("PeriodNavComponent", () => {
  let component: PeriodNavComponent;
  let fixture: ComponentFixture<PeriodNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodNavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
