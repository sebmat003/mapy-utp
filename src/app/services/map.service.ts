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

  currentLocationMaps = [];
  layers = [];
  mapIsLoaded: boolean = false;

  bounds = [];

  options = {
    crs: L.CRS.Simple,
    zoom: 2,
    minZoom: 2,
    maxZoom: 8,
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
    this.bounds.push([[-100, -1], [401, 501]]);
    this.bounds.push([[-100, -2], [402, 502]]);
    this.bounds.push([[-100, -3], [403, 503]]);
    this.bounds.push([[-100, -4], [404, 504]]);

    map.addControl(L.control.zoom(
      {}
    ));

    this.clicked = false;
    map.on('click', <LeafletMouseEvent>(e) => {
      this.coordinates = e.latlng;

      if (map.getZoom() < 4) {
        map.setView(this.coordinates, map.getZoom() + 2);
      } else if (map.getZoom() >= 4 && map.getZoom() <= 6) {
        map.setView(this.coordinates, map.getZoom() + 1);
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
  }

  //starting in campus 2 (Kaliskiego)
  async initializeMap() {
    for(let i=-1; i<4; i++) {
      //only for testing ! -  all levels are the same
      await this.getLocationMaps(
        'https://api-dev.kb.utp.edu.pl/maps/svg/generate?campus=2&level=' + 0 + '&mapSize=5000&isIsometric=true&fontSize=3',
        i + 1, 5000);
    }
    this.layers.push(this.currentLocationMaps[0], this.currentLocationMaps[1]);
    this.layers[0]._url.classList.add('inactive-layer');
    this.mapIsLoaded = true;
    this.addTileAnimation();
    this.getIdRoomInMap();
  }

  async getLocationMaps(url: string, bounds: number, viewBox: number) {
    await this.httpClient.get(url, {responseType: 'text'})
      .toPromise()
      .then((data) => {
        data = data.substring(data.indexOf('\n') + 1);
        data = data.substring(data.lastIndexOf('\n') + 1, -1);
        let svgElement: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.innerHTML = data;
        svgElement.setAttribute('viewBox', '0 0 ' + viewBox + ' ' + viewBox);
        this.currentLocationMaps.push(svgOverlay(svgElement, this.bounds[bounds]));
      });
  }

  async changeLocation() {
    this.mapIsLoaded = false;
    this.removeMarker();
    this.resetClassesInLayers();
    this.searchingService.resetInputs();
    this.layers = [];
    this.currentLocationMaps = [];

    // ONLY FOR TESTING ALL LOCATIONS HAVE "KALISKIEGO" MAPS
    let location =  2; //this.LocationService.locationState;

    for(let i=-1; i<4; i++) {
      //only for testing ! -  all levels are the same
      await this.getLocationMaps(
        'https://api-dev.kb.utp.edu.pl/maps/svg/generate?campus='+ location + '&level=' + 0 + '&mapSize=5000&isIsometric=true&fontSize=3',
        i + 1, 5000);
    }
    this.mapIsLoaded = true;
    this.layers.push(this.currentLocationMaps[0], this.currentLocationMaps[1]);
    this.layers[0]._url.classList.add('inactive-layer');

    this.addTileAnimation();
    this.getIdRoomInMap();
    // this.layers[this.layers.length - 1]._url.classList.add('active-layer');
    // this.layers[this.layers.length - 1]._url.classList.remove('inactive-layer');
  }

  changeFloor() {
    this.removeMarker();
    this.resetClassesInLayers();
    this.searchingService.resetInputs();
    let location = this.LocationService.locationState;
    let floor = this.FloorsService.floorState;
    this.layers = this.updateArray(this.layers, this.currentLocationMaps, floor, location);
  }

  updateArray(current_layers, location_array, floor_number: number, location: number) {
    let updatedArray = current_layers;
    let updatedArray_length = updatedArray.length;
    let difference = 0;
    if (location == 1 || location == 2 || location == 6 ||  location == 7) {
      difference = updatedArray_length - (floor_number + 2);
    } else if (location == 4 || location == 5) {
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
      if (difference == 1) {
        updatedArray[updatedArray.length - 2]._url.classList.add('active-layer');
        updatedArray[updatedArray.length - 2]._url.classList.remove('inactive-layer');
      } else if (difference == 2) {
        for (let i=2; i<=3; i++) {
          updatedArray[updatedArray.length - i]._url.classList.add('active-layer');
          updatedArray[updatedArray.length - i]._url.classList.remove('inactive-layer');
        }
      } else if (difference == 3) {
        for (let i=2; i<=4; i++) {
          updatedArray[updatedArray.length - i]._url.classList.add('active-layer');
          updatedArray[updatedArray.length - i]._url.classList.remove('inactive-layer');
        }
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
    this.addTileAnimation();
    this.getIdRoomInMap();
    return updatedArray;
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

  displayRoomOnMap(locationId: number, floorName: string, roomId: number ) {
    if(locationId != this.LocationService.locationState) {
      this.LocationService.locationState = locationId;
      this.changeLocation();
    }

    let floor = null;

    switch (floorName) {
      case "Piwnica": {
        floor = -1;
      } break;
      case "Parter": {
        floor = 0;
      } break;
      case "I piętro": {
        floor = 1;
      } break;
      case "II piętro": {
        floor = 2;
      } break;
      case "III piętro": {
        floor = 3;
      } break;
      case "IV piętro": {
        floor = 4;
      } break;
    }

    if(floor != this.FloorsService.floorState) {
      this.FloorsService.floorState = floor;
      this.changeFloor();
    }
  }

  removeMarker() {
    if (this.marker != null) {
      this.clicked = false;
      L.Map.prototype.removeControl(this.marker);
    }
  }

  resetClassesInLayers() {
    this.layers.forEach((map) => {
      map._url.classList.add('inactive-layer');
      map._url.classList.remove('active-layer');
    });
    this.currentLocationMaps.forEach((map) => {
      map._url.classList.add('inactive-layer');
      map._url.classList.remove('active-layer');
    });
  }
}

