import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviOptionsComponent } from './navi-options.component';

describe('NaviOptionsComponent', () => {
  let component: NaviOptionsComponent;
  let fixture: ComponentFixture<NaviOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaviOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaviOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
