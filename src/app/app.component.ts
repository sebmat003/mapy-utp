import {Component} from '@angular/core';
import {LocationService} from './services/location.service';
import {MenuRestaurantService} from './services/menu-restaurant.service';
import {FloorsService} from './services/floors.service';
import {TranslateService} from '@ngx-translate/core';
import {SearchingService} from './services/searching.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public LocationService: LocationService, public MenuRestaurantService: MenuRestaurantService,
              public FloorsService: FloorsService, public TranslateService: TranslateService,
              public SearchingService: SearchingService,
              private spinner: NgxSpinnerService) {
    TranslateService.setDefaultLang('pl');
  }


  onTransform(stateLeftMenu: boolean) {
    this.SearchingService.transform = stateLeftMenu;
  }


}
