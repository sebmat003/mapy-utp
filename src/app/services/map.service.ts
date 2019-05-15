import {Injectable} from '@angular/core';
import {LatLngBoundsExpression, svg, svgOverlay} from 'leaflet';
import * as L from 'leaflet';
import {LocationService} from './location.service';
import {FloorsService} from './floors.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class MapService {



  private layersArray: string[] = [];
  private layersKAL1: string[] = [];
  private layersFOR1: string[] = [];
  private layersBER1: string[] = [];
  private layersKOR1: string[] = [];
  private layersMAZ1: string[] = [];
  private layersSEM1: string[] = [];

  bounds: LatLngBoundsExpression[] = [];

  // initialize location KAL1
  level_minus_1_url: string = '/assets/maps/KAL1/LEVEL_-1.svg';
  level_0_url: string = '/assets/maps/KAL1/LEVEL_0.svg';
  level_1_url: string = '/assets/maps/KAL1/LEVEL_1.svg';
  level_2_url: string = '/assets/maps/KAL1/LEVEL_2.svg';
  level_3_url: string = '/assets/maps/KAL1/LEVEL_3.svg';
  bounds1: LatLngBoundsExpression = [[0, 0], [5, 5]];
  bounds2: LatLngBoundsExpression = [[0.015, 0], [5.015, 5]];
  bounds3: LatLngBoundsExpression = [[0.03, 0], [5.03, 5]];
  bounds4: LatLngBoundsExpression = [[0.045, 0], [5.045, 5]];
  bounds5: LatLngBoundsExpression = [[0.06, 0], [5.06, 5]];

  level_minus_1 = svgOverlay(this.level_minus_1_url, this.bounds1);
  level_0 = svgOverlay(this.level_0_url, this.bounds2);
  level_1 = svgOverlay(this.level_1_url, this.bounds3);
  level_2 = svgOverlay(this.level_2_url, this.bounds4);
  level_3 = svgOverlay(this.level_3_url, this.bounds5);
  options = {
    zoom: 9,
    minZoom: 7,
    maxZoom: 15,
    zoomControl: false,
    center: [2.5, 2.5],
    maxBounds: [[0, -1], [5, 6]],
    maxBoundsViscosity: 1,
    attributionControl: false,
  };

  layers = [];

  mapReady(map: L.Map) {
    map.addControl(L.control.zoom(
      {}
    ));
  }


  constructor(private LocationService: LocationService, private FloorsService: FloorsService, private httpClient: HttpClient) {
    this.initializeFloors();
  }

  initializeFloors() {

//TODO ogarnac dobrze viewBox, oraz wrzucanie do tablicy gotowych SvgElementow...


    let svg_content: string = '';
    this.httpClient.get('/assets/maps/KAL1/LEVEL_1.svg', {responseType: 'text'})
      .subscribe( (data) => {
        svg_content = data;

        // cut the first line:
        data = data.substring(data.indexOf("\n") + 1);

        // cut the last line:
        data = data.substring(data.lastIndexOf("\n") + 1, -1);

        let svgElement: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute('viewBox', "0 0 1000 500");
        svgElement.innerHTML = data;
        console.log(svgElement);
        let svg = svgOverlay(svgElement, this.bounds2);
        this.layers.push(svg);


      });


    // this.layers.push(this.level_minus_1);
    // this.layers.push(this.level_0);

    this.bounds.push([[0, 0], [5, 5]]);
    this.bounds.push([[0.015, 0], [5.015, 5]]);
    this.bounds.push([[0.03, 0], [5.03, 5]]);
    this.bounds.push([[0.045, 0], [5.045, 5]]);
    this.bounds.push([[0.06, 0], [5.06, 5]]);

    let start_floor = -1;
    let end_floor = 3;
    for(start_floor; start_floor <= end_floor; start_floor++) {
      this.layersKAL1.push('/assets/maps/KAL1/LEVEL_'+ start_floor +'.svg');
      this.layersBER1.push('/assets/maps/BER1/LEVEL_'+ start_floor +'.svg');
      this.layersKOR1.push('/assets/maps/KOR1/LEVEL_'+ start_floor +'.svg');
      this.layersSEM1.push('/assets/maps/SEM1/LEVEL_'+ start_floor +'.svg');
    }

    start_floor = 0;
    end_floor = 3;

    for(start_floor; start_floor <= end_floor; start_floor++) {
      this.layersFOR1.push('/assets/maps/FOR1/LEVEL_'+ start_floor +'.svg');
    }

    start_floor = 0;
    end_floor = 4;

    for(start_floor; start_floor <= end_floor; start_floor++) {
      this.layersMAZ1.push('/assets/maps/MAZ1/LEVEL_'+ start_floor +'.svg');
    }
  }

  changeFloor() {
    let location = this.LocationService.locationState;
    let floor = this.FloorsService.floorState;
    switch (location) {
      case 0: {
        //KAL1
        this.layersArray = MapService.updateArray(this.layersKAL1, floor);
      } break;
      case 1: {
        //BER1
        this.layersArray = MapService.updateArray(this.layersBER1, floor);
      } break;
      case 2: {
        //FOR1
        this.layersArray = MapService.updateArray(this.layersFOR1, floor);
      } break;
      case 3: {
        //KOR1
        this.layersArray = MapService.updateArray(this.layersKOR1, floor);
      } break;
      case 4: {
        //MAZ1
        this.layersArray = MapService.updateArray(this.layersMAZ1, floor);
      } break;
      case 5: {
        //SEM1
        this.layersArray = MapService.updateArray(this.layersSEM1, floor);
      } break;

    }
    this.layers = [];
    for(let i=0; i < this.layersArray.length; i++) {
      // this.layers.push(svgOverlay(this.layersArray[i],this.bounds[i]));
    }

  }

  static updateArray(array: string[], number: number) {
    let updatedArray = [];

    for(let i=0; i< array.length; i++) {
      updatedArray.push(array[i]);
      if(array[i].includes('_' + number.toString())) break;
    }

    return updatedArray;
  }

}
