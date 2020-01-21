import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorsComponent } from './floors.component';
import {TranslateModule} from '@ngx-translate/core';
import {FloorsService} from '../../services/floors.service';
import {MapService} from '../../services/map.service';
import {LocationService} from '../../services/location.service';
import {HttpClientModule} from '@angular/common/http';
import {SearchingService} from '../../services/searching.service';

describe('FloorsComponent', () => {
  let component: FloorsComponent;
  let fixture: ComponentFixture<FloorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorsComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        FloorsService,
        MapService,
        LocationService,
        SearchingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
