import {Component, OnInit} from '@angular/core';
import {LocationService} from '../services/location.service';
import {FloorsService} from '../services/floors.service';
import {MapService} from '../services/map.service';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.css']
})
export class ChangeLocationComponent implements OnInit {

  constructor(private LocationService: LocationService, private FloorsService: FloorsService, private MapService: MapService) { }

  ngOnInit() {
  }

  onClose() {
    if(this.LocationService.clickedButton == 1) {
      this.LocationService.showLocation = false;
    } else this.LocationService.clickedButton = 1;

  }


  onClickItem(state: number) {
    if(this.LocationService.locationState != state) {
      this.LocationService.locationState = state;
      this.FloorsService.floorState = 0;
      this.MapService.changeLocation();
    }
    setTimeout(() => {
      this.LocationService.showLocation = false;
    },100)
  }
}

