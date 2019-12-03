import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../services/map.service';





@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  constructor(public mapService: MapService) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
