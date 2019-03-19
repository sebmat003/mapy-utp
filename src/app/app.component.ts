import {Component} from '@angular/core';
import {LocationService} from './services/location.service';
import {MenuRestaurantService} from './services/menu-restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  transform: boolean = false;


  constructor(private LocationService: LocationService, private MenuRestaurantService: MenuRestaurantService) {}


  onTransform(stateLeftMenu: boolean) {
    this.transform = stateLeftMenu;
  }


}
