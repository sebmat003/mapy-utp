import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInfoMobileComponent } from './room-info-mobile.component';

describe('RoomInfoMobileComponent', () => {
  let component: RoomInfoMobileComponent;
  let fixture: ComponentFixture<RoomInfoMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomInfoMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInfoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
