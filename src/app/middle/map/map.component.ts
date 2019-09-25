import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../services/map.service';
import * as d3 from 'd3';
import {Subscription} from 'rxjs';
import {color,rgb} from 'd3-color';





@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(public mapService: MapService) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
