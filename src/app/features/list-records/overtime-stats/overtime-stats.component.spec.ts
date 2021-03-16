import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OvertimeStatsComponent } from "./overtime-stats.component";

describe("OvertimeStatsComponent", () => {
  let component: OvertimeStatsComponent;
  let fixture: ComponentFixture<OvertimeStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OvertimeStatsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
