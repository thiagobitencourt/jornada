import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OverTimeDisplayComponent } from "./over-time-display.component";

describe("OverTimeDisplayComponent", () => {
  let component: OverTimeDisplayComponent;
  let fixture: ComponentFixture<OverTimeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverTimeDisplayComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverTimeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
