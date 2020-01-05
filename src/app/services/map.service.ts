import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {svgOverlay} from 'leaflet';
import {LocationService} from './location.service';
import {FloorsService} from './floors.service';
import {HttpClient} from '@angular/common/http';
import * as d3 from 'd3';
import {SearchingService} from './searching.service';


@Injectable()
export class MapService {

  //TODO bedzie 9 lokalizacji, wiec wartoby zrobić 1 tablice, która pokrywa jakąś lokalizację
  //TODO na raz bedzie ładowana 1 lokalizacja

  private layersKAL1 = [];
  private layersFOR1 = [];
  private layersBER1 = [];
  private layersKOR1 = [];
  private layersMAZ1 = [];
  private layersSEM1 = [];
  layers = [];

  mapIsLoaded: boolean = false;

  bounds = [];

  options = {
    crs: L.CRS.Simple,
    zoom: 3,
    minZoom: 3,
    maxZoom: 10,
    zoomControl: false,
    center: [250, 90],
    // maxBounds: [[0, -1], [5, 6]],
    maxBounds: [[120, -120], [350, 320]],
    maxBoundsViscosity: 1,
    attributionControl: false,
    preferCanvas: true,
  };

  coordinates;
  marker;
  clicked: boolean = false;

  icon = {
    icon: L.icon({
      iconSize: [40, 60],
      iconAnchor: [20, 60],
      iconUrl: '../assets/images/location-pin.svg',
      className: 'showing-up'
    })
  };

  mapReady(map: L.Map) {

    this.bounds.push([[-100, 0], [400, 500]]);
    // this.bounds.push([[0.015, 0], [5.015, 5]]);
    // this.bounds.push([[0.03, 0], [5.03, 5]]);
    // this.bounds.push([[0.045, 0], [5.045, 5]]);
    // this.bounds.push([[0.06, 0], [5.06, 5]]);


    map.addControl(L.control.zoom(
      {}
    ));

    this.clicked = false;
    map.on('click', <LeafletMouseEvent>(e) => {
      this.coordinates = e.latlng;


      let difference = 0;
      if (this.LocationService.locationState != 0) {
        difference = 1;
      }

      if (map.getZoom() < 4) {
        map.setView(this.coordinates, map.getZoom() + 2 - difference);
      } else if (map.getZoom() >= 4 && map.getZoom() <= 6) {
        map.setView(this.coordinates, map.getZoom() + 1 - difference);
      } else if (map.getZoom() > 6 && map.getZoom() < 8) {
        map.setView(this.coordinates, map.getZoom() - difference);
      } else {
        map.setView(this.coordinates, map.getZoom() - 1 - difference);
      }
      if (!this.clicked) {
        this.clicked = true;
        this.marker = L.marker([this.coordinates.lat + 0.001, this.coordinates.lng], this.icon).addTo(map);
      } else {
        this.marker.setLatLng([this.coordinates.lat + 0.001, this.coordinates.lng]);
      }

    });
  }


  constructor(private LocationService: LocationService,
              private FloorsService: FloorsService,
              private httpClient: HttpClient,
              private searchingService: SearchingService) {

    this.initializeMap();
    // this.initializeFloors();
  }

  // initializing first map (KAL1 - 2 floors)
  initializeMap() {
    this.getInitializeContent(
      'https://api-dev.kb.utp.edu.pl/maps/svg/generate?campus=2&level=0&mapSize=5000&isIsometric=true&fontSize=3',
      0, 5000);
    // this.getInitializeContent('/assets/maps/KAL1/LEVEL_-1.svg', 0, 500);
    // this.getInitializeContent('/assets/maps/KAL1/LEVEL_0.svg', 1, 500);


  }

  getInitializeContent(url: string, bounds: number, viewBox: number) {
    this.httpClient.get(url, {responseType: 'text'})
      .subscribe((data) => {
        data = data.substring(data.indexOf('\n') + 1);
        data = data.substring(data.lastIndexOf('\n') + 1, -1);
        let svgElement: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.innerHTML = data;
        svgElement.setAttribute('viewBox', '0 0 ' + viewBox + ' ' + viewBox);
        this.layers.push(svgOverlay(svgElement, this.bounds[bounds]));
        // this.layers[0]._url.classList.add('inactive-layer');
        this.addTileAnimation();
        this.getIdRoomInMap();
      });
  }

  // initialize all maps
  async initializeFloors() {
    let start_floor = -1;
    let end_floor = 3;
    let ifSecondFloor = false;
    for (start_floor; start_floor <= end_floor; start_floor++) {

      ifSecondFloor = start_floor == 0;

      await this.getSvgContent('kal', '/assets/maps/KAL1/LEVEL_' + start_floor + '.svg', start_floor + 1, ifSecondFloor);
      await this.getSvgContent('ber', '/assets/maps/BER1/LEVEL_' + start_floor + '.svg', start_floor + 1, ifSecondFloor);
      await this.getSvgContent('kor', '/assets/maps/KOR1/LEVEL_' + start_floor + '.svg', start_floor + 1, ifSecondFloor);
      await this.getSvgContent('sem', '/assets/maps/SEM1/LEVEL_' + start_floor + '.svg', start_floor + 1, ifSecondFloor);
    }

    start_floor = 0;
    end_floor = 3;

    for (start_floor; start_floor <= end_floor; start_floor++) {
      ifSecondFloor = start_floor == 1;
      await this.getSvgContent('for', '/assets/maps/FOR1/LEVEL_' + start_floor + '.svg', start_floor, ifSecondFloor);
    }

    start_floor = 0;
    end_floor = 4;

    for (start_floor; start_floor <= end_floor; start_floor++) {
      ifSecondFloor = start_floor == 1;
      await this.getSvgContent('maz', '/assets/maps/MAZ1/LEVEL_' + start_floor + '.svg', start_floor, ifSecondFloor);
    }

    // this.addTileAnimation();
    this.mapIsLoaded = true;
  }

  changeFloor() {
    this.removeMarker();
    this.resetClassesInLayers();
    this.searchingService.resetInputs();
    let location = this.LocationService.locationState;
    let floor = this.FloorsService.floorState;
    switch (location) {
      case 0: {
        //KAL1
        this.layers = this.updateArray(this.layers, this.layersKAL1, floor, location);
      }
        break;
      case 1: {
        //BER1
        this.layers = this.updateArray(this.layers, this.layersBER1, floor, location);
      }
        break;
      case 2: {
        //FOR1
        this.layers = this.updateArray(this.layers, this.layersFOR1, floor, location);
      }
        break;
      case 3: {
        //KOR1
        this.layers = this.updateArray(this.layers, this.layersKOR1, floor, location);
      }
        break;
      case 4: {
        //MAZ1
        this.layers = this.updateArray(this.layers, this.layersMAZ1, floor, location);
      }
        break;
      case 5: {
        //SEM1
        this.layers = this.updateArray(this.layers, this.layersSEM1, floor, location);
      }
        break;
    }
  }

  updateArray(current_layers, location_array, floor_number: number, location: number) {
    let updatedArray = current_layers;
    let updatedArray_length = updatedArray.length;
    let difference = 0;
    if (location == 0 || location == 1 || location == 3 || location == 5) {
      difference = updatedArray_length - (floor_number + 2);
    } else if (location == 2 || location == 4) {
      difference = updatedArray_length - (floor_number + 1);
    }


    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        updatedArray[updatedArray.length - 1]._url.classList.add('remove-layer');

        setTimeout(() => {
          updatedArray[updatedArray.length - 1]._url.classList.remove('remove-layer');
          updatedArray.pop();
        }, 250);
      }

      // -- this is not beauty but works
      if (difference == 1) {
        updatedArray[updatedArray.length - 2]._url.classList.add('active-layer');
        updatedArray[updatedArray.length - 2]._url.classList.remove('inactive-layer');
      } else if (difference == 2) {
        updatedArray[updatedArray.length - 2]._url.classList.add('active-layer');
        updatedArray[updatedArray.length - 2]._url.classList.remove('inactive-layer');
        updatedArray[updatedArray.length - 3]._url.classList.add('active-layer');
        updatedArray[updatedArray.length - 3]._url.classList.remove('inactive-layer');
      } else if (difference == 3) {
        updatedArray[updatedArray.length - 2]._url.classList.add('active-layer');
        updatedArray[updatedArray.length - 2]._url.classList.remove('inactive-layer');
        updatedArray[updatedArray.length - 3]._url.classList.add('active-layer');
        updatedArray[updatedArray.length - 3]._url.classList.remove('inactive-layer');
        updatedArray[updatedArray.length - 4]._url.classList.add('active-layer');
        updatedArray[updatedArray.length - 4]._url.classList.remove('inactive-layer');
      } else if (difference == 4) {
        updatedArray.forEach((map) => {
          map._url.classList.add('active-layer');
          map._url.classList.remove('inactive-layer');
        });
      }

    } else {
      for (let i = 0; i < Math.abs(difference); i++) {
        updatedArray.push(location_array[updatedArray_length + i]);
      }
      updatedArray[updatedArray.length - 1]._url.classList.add('active-layer');
      updatedArray[updatedArray.length - 1]._url.classList.remove('inactive-layer');
    }
    // this.addTileAnimation();
    return updatedArray;
  }

  async getSvgContent(location: string, url: string, bounds: number, ifSecondFloor: boolean) {
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
            if (!ifSecondFloor) {
              this.layersKAL1[this.layersKAL1.length - 1]._url.classList.add('inactive-layer');
            }
            break;
          case 'ber':
            svgElement.setAttribute('viewBox', '0 0 160 160');
            this.layersBER1.push(svgOverlay(svgElement, this.bounds[bounds]));
            if (!ifSecondFloor) {
              this.layersBER1[this.layersBER1.length - 1]._url.classList.add('inactive-layer');
            }
            break;
          case 'kor':
            svgElement.setAttribute('viewBox', '0 0 200 200');
            this.layersKOR1.push(svgOverlay(svgElement, this.bounds[bounds]));
            if (!ifSecondFloor) {
              this.layersKOR1[this.layersKOR1.length - 1]._url.classList.add('inactive-layer');
            }
            break;
          case 'sem':
            svgElement.setAttribute('viewBox', '0 0 170 170');
            this.layersSEM1.push(svgOverlay(svgElement, this.bounds[bounds]));
            if (!ifSecondFloor) {
              this.layersSEM1[this.layersSEM1.length - 1]._url.classList.add('inactive-layer');
            }
            break;
          case 'for':
            svgElement.setAttribute('viewBox', '0 0 100 100');
            this.layersFOR1.push(svgOverlay(svgElement, this.bounds[bounds]));
            if (!ifSecondFloor) {
              this.layersFOR1[this.layersFOR1.length - 1]._url.classList.add('inactive-layer');
            }
            break;
          case 'maz':
            svgElement.setAttribute('viewBox', '0 0 130 130');
            this.layersMAZ1.push(svgOverlay(svgElement, this.bounds[bounds]));
            if (!ifSecondFloor) {
              this.layersMAZ1[this.layersMAZ1.length - 1]._url.classList.add('inactive-layer');
            }
            break;
        }


      });
  }


  changeLocation() {
    this.removeMarker();
    this.resetClassesInLayers();
    this.searchingService.resetInputs();

    let location = this.LocationService.locationState;
    this.layers = [];
    switch (location) {
      case 0: {
        //KAL1
        this.layers.push(this.layersKAL1[0], this.layersKAL1[1]);
      }
        break;
      case 1: {
        //BER1
        this.layers.push(this.layersBER1[0], this.layersBER1[1]);
      }
        break;
      case 2: {
        //FOR1
        this.layers.push(this.layersFOR1[0]);
      }
        break;
      case 3: {
        //KOR1
        this.layers.push(this.layersKOR1[0], this.layersKOR1[1]);
      }
        break;
      case 4: {
        //MAZ1
        this.layers.push(this.layersMAZ1[0]);
      }
        break;
      case 5: {
        //SEM1
        this.layers.push(this.layersSEM1[0], this.layersSEM1[1]);
      }
        break;
    }

    this.layers[this.layers.length - 1]._url.classList.add('active-layer');
    this.layers[this.layers.length - 1]._url.classList.remove('inactive-layer');
    // this.addTileAnimation();

  }


  resetClassesInLayers() {
    this.layers.forEach((map) => {
      map._url.classList.add('inactive-layer');
      map._url.classList.remove('active-layer');
    });
    this.layersKAL1.forEach((map) => {
      map._url.classList.add('inactive-layer');
      map._url.classList.remove('active-layer');
    });
    this.layersSEM1.forEach((map) => {
      map._url.classList.add('inactive-layer');
      map._url.classList.remove('active-layer');
    });
    this.layersMAZ1.forEach((map) => {
      map._url.classList.add('inactive-layer');
      map._url.classList.remove('active-layer');
    });
    this.layersKOR1.forEach((map) => {
      map._url.classList.add('inactive-layer');
      map._url.classList.remove('active-layer');
    });
    this.layersFOR1.forEach((map) => {
      map._url.classList.add('inactive-layer');
      map._url.classList.remove('active-layer');
    });
    this.layersBER1.forEach((map) => {
      map._url.classList.add('inactive-layer');
      map._url.classList.remove('active-layer');
    });
  }

  addTileAnimation() {
    this.layers.forEach((map) => {
      map._url.classList.add('tile-animation');
      let children = map._url.lastElementChild.children;
      for (let i = 0; i < children.length; i++) {
        let objecttype = children[i].attributes.getNamedItem('objecttype');
        if (children[i].nodeName == 'polygon' && objecttype) {
          if (objecttype.value == 'room') {
            let color = children[i].attributes.getNamedItem('fill');
            d3.select(children[i]).on('mouseover', function () {
              // @ts-ignore
              d3.select(children[i]).style('fill', d3.color(color.value).darker());
            }).on('mouseout', function () {
              // @ts-ignore
              d3.select(children[i]).style('fill', d3.color(color.value));
            });
            children[i].classList.add('path-animation');
          }
        }
      }
    });
  }

  getIdRoomInMap() {
    this.layers.forEach((map) => {
      let children = map._url.lastElementChild.children;
      for (let i = 0; i < children.length; i++) {
        let objecttype = children[i].attributes.getNamedItem('objecttype');
        let objectid = children[i].attributes.getNamedItem('objectid');
        if (children[i].nodeName == 'polygon' && objecttype && objectid) {
          if (objecttype.value == 'room') {
            d3.select(children[i]).on('click', ()=> {
              this.searchingService.getRoomInfoData(objectid.value);
              this.searchingService.clickedListItem = true;
            })
          }
        }
      }
    });
  }

  removeMarker() {
    if (this.marker != null) {
      this.clicked = false;
      L.Map.prototype.removeControl(this.marker);
    }

  }


}

