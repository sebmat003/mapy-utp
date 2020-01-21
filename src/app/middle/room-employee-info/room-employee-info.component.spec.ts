import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEmployeeInfoComponent } from './room-employee-info.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchingService} from '../../services/searching.service';
import {MapService} from '../../services/map.service';
import {MinimizeButtonService} from '../../services/minimize-button.service';
import {HttpClientModule} from '@angular/common/http';
import {LocationService} from '../../services/location.service';
import {FloorsService} from '../../services/floors.service';
import {MenuRestaurantService} from '../../services/menu-restaurant.service';

describe('RoomEmployeeInfoComponent', () => {
  let component: RoomEmployeeInfoComponent;
  let fixture: ComponentFixture<RoomEmployeeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomEmployeeInfoComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        SearchingService,
        MapService,
        MinimizeButtonService,
        LocationService,
        FloorsService,
        MenuRestaurantService
      ]
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
