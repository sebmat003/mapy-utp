import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMenuMobileComponent } from './left-menu-mobile.component';

describe('LeftMenuMobileComponent', () => {
  let component: LeftMenuMobileComponent;
  let fixture: ComponentFixture<LeftMenuMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftMenuMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
