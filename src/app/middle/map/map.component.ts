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
    // this.subscription = this.mapService.animationMap$
    //   .subscribe(()=> {
    //     this.animateMap();
    //   });
  }

  ngOnInit() {
  }

  animateMap() {

    // let fill_color;
    // d3.selectAll('path').on("mouseover", function() {
    //   if((d3.select(this).attr('stroke-width'))=='0.1') {
    //     fill_color = d3.select(this).style('fill');
    //     let r,g,b;
    //     r = fill_color[0];
    //     g = fill_color[1];
    //     b = fill_color[2];
    //
    //     // @ts-ignore
    //     d3.select(this).style('fill', rgb.prototype.darker(r,g,b));
    //
    //   }
    //
    // }).on("mouseout", function(){
    //   if((d3.select(this).attr('stroke-width'))=='0.1') {
    //     d3.select(this).style('fill', fill_color);
    //   }
    // })
  }

  ngOnDestroy() {
  }

}
