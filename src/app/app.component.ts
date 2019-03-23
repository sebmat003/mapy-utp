import {Component} from '@angular/core';
import {LocationService} from './services/location.service';
import {MenuRestaurantService} from './services/menu-restaurant.service';
import {FloorsService} from './services/floors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  transform: boolean = false;


  constructor(public LocationService: LocationService, public MenuRestaurantService: MenuRestaurantService,
              public FloorsService: FloorsService) {}


  onTransform(stateLeftMenu: boolean) {
    this.transform = stateLeftMenu;
  }


}
