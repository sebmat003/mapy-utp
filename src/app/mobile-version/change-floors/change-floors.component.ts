import { Component, OnInit } from '@angular/core';
import {FloorsService} from '../../services/floors.service';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-change-floors',
  templateUrl: './change-floors.component.html',
  styleUrls: ['./change-floors.component.css']
})
export class ChangeFloorsComponent implements OnInit {

  constructor(public FloorsService: FloorsService, public MapService: MapService) { }

  ngOnInit() {
  }

  onClose() {
    if(this.FloorsService.clickedButton == 1) {
      this.FloorsService.showFloors = false;
    } else this.FloorsService.clickedButton = 1;

  }


  onClickItem(state: number) {
    this.FloorsService.floorState = state;

    setTimeout(() => {
      this.FloorsService.showFloors = false;
      this.MapService.changeFloor();
    },100)
  }
}
