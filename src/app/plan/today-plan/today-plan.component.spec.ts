import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayPlanComponent } from './today-plan.component';

describe('TodayPlanComponent', () => {
  let component: TodayPlanComponent;
  let fixture: ComponentFixture<TodayPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
