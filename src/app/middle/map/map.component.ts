import { Component, OnInit } from '@angular/core';
import {imageOverlay, LatLngBoundsExpression} from 'leaflet';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  imageUrl: string = 'http://maps.utp.edu.pl/api/maps/KAL1/svg/LEVEL_1';
  bounds: LatLngBoundsExpression = [[0,0],[50,50]];
  imageOverlay = imageOverlay(this.imageUrl, this.bounds);
  options = {
    layers: [
      this.imageOverlay
    ],
    zoom: 1,
    center: [-100,0],
  };


  constructor() { }

  ngOnInit() {

  }


}
