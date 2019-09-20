import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../services/map.service';
import * as d3 from 'd3';
import {log} from 'util';
import {Subscription} from 'rxjs';




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

  // animateMap() {
  //   console.log('animate...');
  //   d3.selectAll('path').on("mouseover", function() {
  //     d3.select(this).style('fill','pink');
  //   }).on("mouseout", function(){
  //     // d3.select(this).style('filter','brightness(100%)');
  //   })
  // }

  ngOnDestroy() {
  }

}
