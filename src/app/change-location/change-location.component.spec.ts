import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLocationComponent } from './change-location.component';
import {TranslateModule} from '@ngx-translate/core';
import {LocationService} from '../services/location.service';
import {MapService} from '../services/map.service';
import {FloorsService} from '../services/floors.service';
import {HttpClientModule} from '@angular/common/http';
import {SearchingService} from '../services/searching.service';

describe('ChangeLocationComponent', () => {
  let component: ChangeLocationComponent;
  let fixture: ComponentFixture<ChangeLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLocationComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        LocationService,
        MapService,
        FloorsService,
        SearchingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
