import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @Input() private transform: boolean = false;

  constructor(private LocationService: LocationService) { }

  ngOnInit() {
  }

  openLocation() {
    this.LocationService.showLocation = true;
    this.LocationService.clickedButton = 0;
  }
}
