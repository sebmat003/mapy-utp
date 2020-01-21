import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { LogoComponent } from './left-menu/logo/logo.component';
import { NavigationPanelComponent } from './left-menu/navigation-panel/navigation-panel.component';
import { MostVisitedComponent } from './left-menu/most-visited/most-visited.component';
import { RestaurantComponent } from './left-menu/restaurant/restaurant.component';
import { SearchingComponent } from './middle/searching/searching.component';
import { MapComponent } from './middle/map/map.component';
import { NaviOptionsComponent } from './middle/navi-options/navi-options.component';
import { LocationComponent } from './middle/location/location.component';
import { FloorsComponent } from './middle/floors/floors.component';
import { LanguageComponent } from './middle/language/language.component';
import { SizingMapComponent } from './middle/sizing-map/sizing-map.component';
import { ChangeLocationComponent } from './change-location/change-location.component';
import { MenuRestaurantComponent } from './menu-restaurant/menu-restaurant.component';
import { BusComponent } from './bus/bus.component';
import { FooterComponent } from './footer/footer.component';
import { LeftMenuMobileComponent } from './mobile-version/left-menu-mobile/left-menu-mobile.component';
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
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MinimizeButtonService} from './services/minimize-button.service';
import { ListSearchingComponent } from './middle/list-searching/list-searching.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {SearchingService} from './services/searching.service';
import {FormsModule} from '@angular/forms';
import {FilterPipe} from './pipes/filter.pipe';
import { SearchPanelComponent } from './left-menu/search-panel/search-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {VarDirective} from './directives/var.directive';
import { RoomEmployeeInfoComponent } from './middle/room-employee-info/room-employee-info.component';
import { LastSearchRoomsComponent } from './left-menu/last-search-rooms/last-search-rooms.component';
@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    LogoComponent,
    NavigationPanelComponent,
    MostVisitedComponent,
    RestaurantComponent,
    SearchingComponent,
    MapComponent,
    NaviOptionsComponent,
    LocationComponent,
    FloorsComponent,
    LanguageComponent,
    SizingMapComponent,
    ChangeLocationComponent,
    MenuRestaurantComponent,
    BusComponent,
    FooterComponent,
    LeftMenuMobileComponent,
    LocationMobileComponent,
    FloorsMobileComponent,
    ChangeFloorsComponent,
    BusItemComponent,
    ListSearchingComponent,
    FilterPipe,
    SearchPanelComponent,
    VarDirective,
    RoomEmployeeInfoComponent,
    LastSearchRoomsComponent
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
    }),
    FilterPipeModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule

  ],
  providers: [
    LocationService,
    MenuRestaurantService,
    MenuMobileService,
    FloorsService,
    MapService,
    MinimizeButtonService,
    SearchingService,
    TranslateService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/i18n/", ".json");
}
