import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFloorsComponent } from './change-floors.component';
import {TranslateModule} from '@ngx-translate/core';
import {FloorsService} from '../../services/floors.service';
import {MapService} from '../../services/map.service';
import {HttpClientModule} from '@angular/common/http';
import {LocationService} from '../../services/location.service';
import {SearchingService} from '../../services/searching.service';

describe('ChangeFloorsComponent', () => {
  let component: ChangeFloorsComponent;
  let fixture: ComponentFixture<ChangeFloorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeFloorsComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        MapService,
        FloorsService,
        LocationService,
        SearchingService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
