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

  private subscription: Subscription;


  constructor(public mapService: MapService) {
    this.subscription = this.mapService.animationMap$
      .subscribe( ()=> {
        this.animateMap();
      });
  }

  ngOnInit() {
  }

  animateMap() {
    // d3.select('.map').style('background-color', 'pink');
    console.log('animate...');
    // d3.selectAll('path').call(log,'svg');
    d3.selectAll('path').on("mouseover", function() {
      d3.select(this).style('fill','pink');
    }).on("mouseout", function(){
      d3.select(this).style('filter','brightness(100%)');
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
