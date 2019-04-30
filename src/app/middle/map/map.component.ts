import { Component, OnInit } from '@angular/core';
import {imageOverlay, LatLngBoundsExpression,} from 'leaflet';
import * as L from 'leaflet';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {



  level_minus_1_url: string = '/assets/maps/KAL1/LEVEL_MINUS_1.svg';
  level_0_url: string = '/assets/maps/KAL1/LEVEL_0.svg';
  level_1_url: string = '/assets/maps/KAL1/LEVEL_1.svg';
  level_2_url: string = '/assets/maps/KAL1/LEVEL_2.svg';
  level_3_url: string = '/assets/maps/KAL1/LEVEL_3.svg';
  bounds1: LatLngBoundsExpression = [[0,0],[5,5]];
  bounds2: LatLngBoundsExpression = [[0.015,0],[5.015,5]];
  bounds3: LatLngBoundsExpression = [[0.03,0],[5.03,5]];
  bounds4: LatLngBoundsExpression = [[0.045,0],[5.045,5]];
  bounds5: LatLngBoundsExpression = [[0.06,0],[5.06,5]];
  level_minus_1 = imageOverlay(this.level_minus_1_url, this.bounds1);
  level_0 = imageOverlay(this.level_0_url, this.bounds2);
  level_1 = imageOverlay(this.level_1_url, this.bounds3);
  level_2 = imageOverlay(this.level_2_url, this.bounds4);
  level_3 = imageOverlay(this.level_3_url, this.bounds5);
  options = {
    layers: [
      this.level_minus_1,
      this.level_0,
      this.level_1,
      this.level_2,
      this.level_3
    ],
    zoom: 9,
    minZoom: 7,
    maxZoom: 15,
    zoomControl: false,
    center: [2.5,2.5],
    maxBounds: [[0,-1],[5,6]],
    maxBoundsViscosity: 1,
    attributionControl: false

  };

  mapReady(map: L.Map) {
    map.addControl(L.control.zoom(
      {}
    ));
  }




  constructor() { }

  ngOnInit() {

  }


}
