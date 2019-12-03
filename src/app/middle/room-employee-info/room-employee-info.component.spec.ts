import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEmployeeInfoComponent } from './room-employee-info.component';

describe('RoomEmployeeInfoComponent', () => {
  let component: RoomEmployeeInfoComponent;
  let fixture: ComponentFixture<RoomEmployeeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomEmployeeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEmployeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
