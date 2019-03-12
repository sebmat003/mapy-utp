import {Component} from '@angular/core';
import {LocationService} from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  transform: boolean = false;

  constructor(private LocationService: LocationService) {}


  onTransform(stateLeftMenu: boolean) {
    this.transform = stateLeftMenu;
    // this.emitTransform.emit(this.transform);
  }

}
