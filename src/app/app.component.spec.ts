import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {LeftMenuComponent} from './left-menu/left-menu.component';
import {FloorsComponent} from './middle/floors/floors.component';
import {LocationComponent} from './middle/location/location.component';
import {LeftMenuMobileComponent} from './mobile-version/left-menu-mobile/left-menu-mobile.component';
import {MapComponent} from './middle/map/map.component';
import {NaviOptionsComponent} from './middle/navi-options/navi-options.component';
import {SearchingComponent} from './middle/searching/searching.component';
import {ListSearchingComponent} from './middle/list-searching/list-searching.component';
import {ChangeLocationComponent} from './change-location/change-location.component';
import {MenuRestaurantService} from './services/menu-restaurant.service';
import {ChangeFloorsComponent} from './mobile-version/change-floors/change-floors.component';
import {RoomEmployeeInfoComponent} from './middle/room-employee-info/room-employee-info.component';
import {BusComponent} from './bus/bus.component';
import {LanguageComponent} from './middle/language/language.component';
import {FooterComponent} from './footer/footer.component';
import {FloorsMobileComponent} from './mobile-version/floors-mobile/floors-mobile.component';
import {LocationMobileComponent} from './mobile-version/location-mobile/location-mobile.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LocationService} from './services/location.service';
import {FloorsService} from './services/floors.service';
import {SearchingService} from './services/searching.service';
import {HttpClientModule} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LeftMenuComponent,
        FloorsComponent,
        LocationComponent,
        LeftMenuMobileComponent,
        MapComponent,
        NaviOptionsComponent,
        SearchingComponent,
        ListSearchingComponent,
        ChangeLocationComponent,
        MenuRestaurantService,
        ChangeFloorsComponent,
        RoomEmployeeInfoComponent,
        BusComponent,
        LanguageComponent,
        FooterComponent,
        FloorsMobileComponent,
        LocationMobileComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        LocationService,
        MenuRestaurantService,
        FloorsService,
        TranslateService,
        SearchingService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
