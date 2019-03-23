import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-location-mobile',
  templateUrl: './location-mobile.component.html',
  styleUrls: ['./location-mobile.component.css']
})
export class LocationMobileComponent implements OnInit {

  constructor(public LocationService: LocationService) { }

  ngOnInit() {
  }

  openLocation() {
    this.LocationService.showLocation = true;
    this.LocationService.clickedButton = 0;
  }
}
