import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationComponent } from './location.component';
import {TranslateModule} from '@ngx-translate/core';
import {LocationService} from '../../services/location.service';
import {MapService} from '../../services/map.service';
import {FloorsService} from '../../services/floors.service';
import {HttpClientModule} from '@angular/common/http';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule],
      providers: [
        LocationService,
        MapService,
        FloorsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
