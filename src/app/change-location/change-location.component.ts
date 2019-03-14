import {Component, OnInit} from '@angular/core';
import {LocationService} from '../services/location.service';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.css']
})
export class ChangeLocationComponent implements OnInit {

  constructor(private LocationService: LocationService) { }

  ngOnInit() {
  }

  onClose() {
    if(this.LocationService.clickedButton == 1) {
      this.LocationService.showLocation = false;
    } else this.LocationService.clickedButton = 1;

  }


  onClickItem(state: number) {
    this.LocationService.locationState = state;

    setTimeout(() => {
      this.LocationService.showLocation = false;
    },100)
  }
}

