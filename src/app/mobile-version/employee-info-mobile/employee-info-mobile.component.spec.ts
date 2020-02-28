import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoMobileComponent } from './employee-info-mobile.component';

describe('EmployeeInfoMobileComponent', () => {
  let component: EmployeeInfoMobileComponent;
  let fixture: ComponentFixture<EmployeeInfoMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeInfoMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInfoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
