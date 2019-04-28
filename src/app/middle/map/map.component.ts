import { Component, OnInit } from '@angular/core';
import {imageOverlay, LatLngBoundsExpression} from 'leaflet';
import * as L from 'leaflet';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  imageUrl1: string = '/assets/maps/KAL1/LEVEL_1.svg';
  bounds1: LatLngBoundsExpression = [[0,0],[5,5]];
  imageOverlay1 = imageOverlay(this.imageUrl1, this.bounds1);
  // imageOverlay2 = imageOverlay(this.imageUrl2, this.bounds2);
  options = {
    layers: [
      this.imageOverlay1,
      // this.imageOverlay2
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
