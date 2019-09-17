import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { LogoComponent } from './left-menu/logo/logo.component';
import { NavigationPanelComponent } from './left-menu/navigation-panel/navigation-panel.component';
import { MostVisitedComponent } from './left-menu/most-visited/most-visited.component';
import { RestaurantComponent } from './left-menu/restaurant/restaurant.component';
import { RoomInfoComponent } from './left-menu/room-info/room-info.component';
import { EmployeeInfoComponent } from './left-menu/employee-info/employee-info.component';
import { SearchingComponent } from './middle/searching/searching.component';
import { MapComponent } from './middle/map/map.component';
import { NaviOptionsComponent } from './middle/navi-options/navi-options.component';
import { LocationComponent } from './middle/location/location.component';
import { FloorsComponent } from './middle/floors/floors.component';
import { LanguageComponent } from './middle/language/language.component';
import { SizingMapComponent } from './middle/sizing-map/sizing-map.component';
import { ChangeLocationComponent } from './change-location/change-location.component';
import { MenuRestaurantComponent } from './menu-restaurant/menu-restaurant.component';
import { PlanComponent } from './plan/plan.component';
import { BusComponent } from './bus/bus.component';
import { FooterComponent } from './footer/footer.component';
import { TodayPlanComponent } from './plan/today-plan/today-plan.component';
import { WeekPlanComponent } from './plan/week-plan/week-plan.component';
import { RoomInfoMobileComponent } from './mobile-version/room-info-mobile/room-info-mobile.component';
import { EmployeeInfoMobileComponent } from './mobile-version/employee-info-mobile/employee-info-mobile.component';
import { LeftMenuMobileComponent } from './mobile-version/left-menu-mobile/left-menu-mobile.component';
import { OptionsComponent } from './mobile-version/left-menu-mobile/options/options.component';
import { ChangeLanguageMobileComponent } from './mobile-version/change-language-mobile/change-language-mobile.component';
import { LocationMobileComponent } from './mobile-version/location-mobile/location-mobile.component';
import { FloorsMobileComponent } from './mobile-version/floors-mobile/floors-mobile.component';
import { ChangeFloorsComponent } from './mobile-version/change-floors/change-floors.component';
import { BusItemComponent } from './bus/bus-item/bus-item.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {LocationService} from './services/location.service';
import {MenuRestaurantService} from './services/menu-restaurant.service';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MenuMobileService} from './services/menu-mobile.service';
import {FloorsService} from './services/floors.service';
import {MapService} from './services/map.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';




@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    LogoComponent,
    NavigationPanelComponent,
    MostVisitedComponent,
    RestaurantComponent,
    RoomInfoComponent,
    EmployeeInfoComponent,
    SearchingComponent,
    MapComponent,
    NaviOptionsComponent,
    LocationComponent,
    FloorsComponent,
    LanguageComponent,
    SizingMapComponent,
    ChangeLocationComponent,
    MenuRestaurantComponent,
    PlanComponent,
    BusComponent,
    FooterComponent,
    TodayPlanComponent,
    WeekPlanComponent,
    RoomInfoMobileComponent,
    EmployeeInfoMobileComponent,
    LeftMenuMobileComponent,
    OptionsComponent,
    ChangeLanguageMobileComponent,
    LocationMobileComponent,
    FloorsMobileComponent,
    ChangeFloorsComponent,
    BusItemComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    PdfViewerModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    LocationService,
    MenuRestaurantService,
    MenuMobileService,
    FloorsService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
