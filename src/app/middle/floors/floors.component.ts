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


  constructor(private FloorsService: FloorsService, private MapService: MapService, public LocationService: LocationService) {
  }

  ngOnInit() {

  }


  async onClickFloor(number: number) {
    if(!this.MapService.floorIsChanging && this.FloorsService.floorState != number) {
      this.FloorsService.floorState = number;
      await this.MapService.changeFloor();
    }
  }
}


