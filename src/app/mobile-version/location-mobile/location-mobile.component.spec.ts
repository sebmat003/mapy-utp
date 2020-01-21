import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMobileComponent } from './location-mobile.component';
import {LocationService} from '../../services/location.service';

describe('LocationMobileComponent', () => {
  let component: LocationMobileComponent;
  let fixture: ComponentFixture<LocationMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMobileComponent ],
      providers: [
        LocationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
