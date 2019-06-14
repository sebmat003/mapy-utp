import {Component, Input, OnInit} from '@angular/core';
import {FloorsService} from '../../services/floors.service';
import {MapService} from '../../services/map.service';
import {LocationService} from '../../services/location.service';


@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.css']
})
export class FloorsComponent implements OnInit {

  @Input() private transform: boolean = false;
  // public floorState: number = 0;


  constructor(private FloorsService: FloorsService, private MapService: MapService, public LocationService: LocationService) {
  }

  ngOnInit() {

  }


  onClickFloor(number: number) {
    // this.floorState = number;
    if(this.FloorsService.floorState != number) {
      this.FloorsService.floorState = number;
      this.MapService.changeFloor();
    }


  }
}
