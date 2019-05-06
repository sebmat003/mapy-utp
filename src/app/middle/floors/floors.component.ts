import {Component, Input, OnInit} from '@angular/core';
import {FloorsService} from '../../services/floors.service';
import {MapService} from '../../services/map.service';


@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.css']
})
export class FloorsComponent implements OnInit {

  @Input() private transform: boolean = false;
  public floorState: number = 0;


  constructor(private FloorsService: FloorsService, private MapService: MapService) {
  }

  ngOnInit() {
  }


  onClickFloor(number: number) {
    this.floorState = number;
    this.FloorsService.floorState = this.floorState;
    this.MapService.changeFloor();


  }
}
