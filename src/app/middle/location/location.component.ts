import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @Input() private transform: boolean = false;

  constructor(public LocationService: LocationService, public MapService: MapService) { }

  ngOnInit() {
  }

  openLocation() {
    if(this.MapService.mapIsLoaded) {
      this.LocationService.showLocation = true;
      this.LocationService.clickedButton = 0;
    }

  }
}
