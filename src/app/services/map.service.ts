import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {LatLngBoundsExpression, svg, svgOverlay} from 'leaflet';
import {LocationService} from './location.service';
import {FloorsService} from './floors.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MapService {

  private layersKAL1 = [];
  private layersFOR1 = [];
  private layersBER1 = [];
  private layersKOR1 = [];
  private layersMAZ1 = [];
  private layersSEM1 = [];
  layers = [];

  bounds: LatLngBoundsExpression[] = [];

  options = {
    zoom: 9,
    minZoom: 7,
    maxZoom: 15,
    zoomControl: false,
    center: [2.5, 2.5],
    maxBounds: [[0, -1], [5, 6]],
    maxBoundsViscosity: 1,
    attributionControl: false,
    preferCanvas: true
  };


  mapReady(map: L.Map) {
    map.addControl(L.control.zoom(
      {}
    ));
  }


  constructor(private LocationService: LocationService, private FloorsService: FloorsService, private httpClient: HttpClient) {
    this.initializeMap();
    this.initializeFloors();
  }

  // initialiazing first map (KAL1 - 2 floors)
  initializeMap() {
    this.getInitializeContent('/assets/maps/KAL1/LEVEL_-1.svg', 0, 500);
    this.getInitializeContent('/assets/maps/KAL1/LEVEL_0.svg', 1, 500);
  }

  getInitializeContent(url: string, bounds: number, viewBox: number){
    this.httpClient.get(url, {responseType: 'text'})
      .subscribe((data) => {
        data = data.substring(data.indexOf('\n') + 1);
        data = data.substring(data.lastIndexOf('\n') + 1, -1);
        let svgElement: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.innerHTML = data;
        svgElement.setAttribute('viewBox', '0 0 ' + viewBox + ' ' + viewBox);
        this.layers.push(svgOverlay(svgElement, this.bounds[bounds]));
      });
  }

  // initialize all maps
  async initializeFloors() {
        this.bounds.push([[0, 0], [5, 5]]);
        this.bounds.push([[0.015, 0], [5.015, 5]]);
        this.bounds.push([[0.03, 0], [5.03, 5]]);
        this.bounds.push([[0.045, 0], [5.045, 5]]);
        this.bounds.push([[0.06, 0], [5.06, 5]]);

        let start_floor = -1;
        let end_floor = 3;
        for (start_floor; start_floor <= end_floor; start_floor++) {
          await this.getSvgContent('kal', '/assets/maps/KAL1/LEVEL_' + start_floor + '.svg', start_floor + 1);
          await this.getSvgContent('ber', '/assets/maps/BER1/LEVEL_' + start_floor + '.svg', start_floor + 1);
          await this.getSvgContent('kor', '/assets/maps/KOR1/LEVEL_' + start_floor + '.svg', start_floor + 1);
          await this.getSvgContent('sem', '/assets/maps/SEM1/LEVEL_' + start_floor + '.svg', start_floor + 1);
        }

        start_floor = 0;
        end_floor = 3;

        for (start_floor; start_floor <= end_floor; start_floor++) {
          await this.getSvgContent('for', '/assets/maps/FOR1/LEVEL_' + start_floor + '.svg', start_floor);
        }

        start_floor = 0;
        end_floor = 4;

        for (start_floor; start_floor <= end_floor; start_floor++) {
          await this.getSvgContent('maz', '/assets/maps/MAZ1/LEVEL_' + start_floor + '.svg', start_floor);
        }

  }

  changeFloor() {
    let location = this.LocationService.locationState;
    let floor = this.FloorsService.floorState;
    switch (location) {
      case 0: {
        //KAL1
        this.layers = this.updateArray(this.layersKAL1, floor, location);
      }
        break;
      case 1: {
        //BER1
        this.layers = this.updateArray(this.layersBER1, floor, location);
      }
        break;
      case 2: {
        //FOR1
        this.layers = this.updateArray(this.layersFOR1, floor, location);
      }
        break;
      case 3: {
        //KOR1
        this.layers = this.updateArray(this.layersKOR1, floor, location);
      }
        break;
      case 4: {
        //MAZ1
        this.layers = this.updateArray(this.layersMAZ1, floor, location);
      }
        break;
      case 5: {
        //SEM1
        this.layers = this.updateArray(this.layersSEM1, floor, location);
      }
        break;
    }
  }

  updateArray(array, number: number, location: number) {
    let updatedArray = [];

    if (location == 0 || location == 1 || location == 3 || location == 5) {
      for (let i = 0; i <= number + 1; i++) {
        updatedArray.push(array[i]);
      }
    } else if (location == 2 || location == 4) {
      for (let i = 0; i <= number; i++) {
        updatedArray.push(array[i]);
      }
    } else {
      console.log('something went wrong');
    }
    return updatedArray;
  }

  async getSvgContent(location: string, url: string, bounds: number) {
    await this.httpClient.get(url, {responseType: 'text'})
      .toPromise()
      .then((data) => {
        // cut the first line: ( <svg> tags )
        data = data.substring(data.indexOf('\n') + 1);
        // cut the last line:
        data = data.substring(data.lastIndexOf('\n') + 1, -1);

        let svgElement: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.innerHTML = data;
        switch (location) {
          case 'kal':
            svgElement.setAttribute('viewBox', '0 0 500 500');
            this.layersKAL1.push(svgOverlay(svgElement, this.bounds[bounds]));
            break;
          case 'ber':
            svgElement.setAttribute('viewBox', '0 0 160 160');
            this.layersBER1.push(svgOverlay(svgElement, this.bounds[bounds]));
            break;
          case 'kor':
            svgElement.setAttribute('viewBox', '0 0 200 200');
            this.layersKOR1.push(svgOverlay(svgElement, this.bounds[bounds]));
            break;
          case 'sem':
            svgElement.setAttribute('viewBox', '0 0 170 170');
            this.layersSEM1.push(svgOverlay(svgElement, this.bounds[bounds]));
            break;
          case 'for':
            svgElement.setAttribute('viewBox', '0 0 100 100');
            this.layersFOR1.push(svgOverlay(svgElement, this.bounds[bounds]));
            break;
          case 'maz':
            svgElement.setAttribute('viewBox', '0 0 130 130');
            this.layersMAZ1.push(svgOverlay(svgElement, this.bounds[bounds]));
            break;
        }

      });
  }
}
