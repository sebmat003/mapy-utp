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

  map: L.Map;
  currentLocationMaps = [];
  layers = [];
  mapIsLoaded: boolean = false;

  bounds = [];

  previousRoomColor = null;
  previousRoomId = null;

  options = {
    crs: L.CRS.Simple,
    zoom: 2,
    minZoom: 2,
    maxZoom: 8,
    zoomControl: false,
    center: [250, 90],
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
      console.log('123');
      this.coordinates = e.latlng;
      map.setView(this.coordinates, map.getZoom());
      if (!this.clicked) {
        console.log('clicked = true');
        this.clicked = true;
        this.marker = L.marker([this.coordinates.lat + 0.001, this.coordinates.lng], this.icon).addTo(map);
      } else {
        console.log('false');
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
    this.addTileAnimation();
    this.getIdRoomInMap();
    this.mapIsLoaded = true;
    this.layers.push(this.currentLocationMaps[0], this.currentLocationMaps[1]);
    this.layers[0]._url.classList.add('inactive-layer');
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
    // this.addTileAnimation();
    // this.getIdRoomInMap();
    return updatedArray;
  }


  addTileAnimation() {
    this.currentLocationMaps.forEach((map) => {
      map._url.classList.add('tile-animation');
      let children = map._url.lastElementChild.children;
      for (let i = 0; i < children.length; i++) {
        let objecttype = children[i].attributes.getNamedItem('objecttype');
        if (children[i].nodeName == 'polygon' && objecttype) {
          if (objecttype.value == 'ROOM') {
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
    this.currentLocationMaps.forEach((map) => {
      let children = map._url.lastElementChild.children;
      for (let i = 0; i < children.length; i++) {
        let objecttype = children[i].attributes.getNamedItem('objecttype');
        let objectid = children[i].attributes.getNamedItem('objectid');
        if (children[i].nodeName == 'polygon' && objecttype && objectid) {
          if (objecttype.value == 'ROOM') {
            d3.select(children[i]).on('click', ()=> {
              this.searchingService.getRoomInfoData(objectid.value);
              this.searchingService.clickedListItem = true;
            })
          }
        }
      }
    });
  }

  async displayRoomOnMap(roomObject) {
    this.resetPreviousRoomSettings();
    this.searchingService.transform = false;

    let campusId = roomObject.campusId;
    let roomId = roomObject.roomId;
    let floorName = roomObject.floorName;
    let roomNumber = roomObject.roomNumber;
    let roomMinorUnit = roomObject.roomMinorUnit;

    //push object to last searching rooms
    this.searchingService.insertObjectIntoLastRooms({
      'campusId': campusId,
      'floorName': floorName,
      'roomId': roomId,
      'roomNumber': roomNumber,
      'roomMinorUnit': roomMinorUnit,
    });

    if(campusId != this.LocationService.locationState) {
      this.LocationService.locationState = campusId;
      await this.changeLocation();
    }

    let floor = null;

    floorName.toLowerCase();

    switch (floorName) {
      case "Piwnica":
      case "Poziom -1": {
        floor = -1;
      } break;
      case "Parter":
      case "Poziom 0": {
        floor = 0;
      } break;
      case "I piętro":
      case "I piętro - Poddasze":
      case "Poziom 1": {
        floor = 1;
      } break;
      case "II piętro":
      case "Poziom 2": {
        floor = 2;
      } break;
      case "III piętro":
      case "Poziom 3": {
        floor = 3;
      } break;
      case "IV piętro":
      case "Poziom 4": {
        floor = 4;
      } break;
    }

    if(floor != this.FloorsService.floorState) {
      this.FloorsService.floorState = floor;
      this.changeFloor();
    }

    let children = this.currentLocationMaps[floor + 1]._url.lastElementChild.children;
    for (let i = 0; i < children.length; i++) {
      let objecttype = children[i].attributes.getNamedItem('objecttype');
      let objectid = children[i].attributes.getNamedItem('objectid');

      if (children[i].nodeName == 'polygon' && objecttype && objectid) {
        if (objectid.value == roomId && objecttype.value == 'ROOM') {
          this.previousRoomColor = children[i].attributes.getNamedItem('fill');
          this.previousRoomId = roomId;

          d3.select(children[i]).on('mouseover', function () {
          }).on('mouseout', function () {
          });

          children[i].id = 'selected-room';
          let event = new MouseEvent('click', {
            view: window,
            bubbles: true,
          });

          // document.getElementById('selected-room').dispatchEvent(event);
          // @ts-ignore
          d3.select(children[i]).style('fill', 'white');
          children[i].classList.add('navigated-path-animation');

        }
      }
    }

  }

  displayAdditionalElementsOnMap(type: string) {
    this.currentLocationMaps.forEach((item) => {
      let map = item._url.lastElementChild.children;
      for (let i = 0; i < map.length; i++) {
        let objecttype = map[i].attributes.getNamedItem('objecttype');
        if (map[i].nodeName == 'polygon' && objecttype) {
          if(objecttype.value == type) {
            // @ts-ignore
            d3.select(map[i]).style('fill', 'white');
            map[i].classList.add('navigated-path-animation');
          }
        }
      }
    });
  }

  resetPreviousRoomSettings() {
    this.currentLocationMaps.forEach((map)=> {
      let children = map._url.lastElementChild.children;
      for (let i = 0; i < children.length; i++) {
        let objecttype = children[i].attributes.getNamedItem('objecttype');
        let objectid = children[i].attributes.getNamedItem('objectid');

        //previous room - reset settings
        if (children[i].nodeName == 'polygon' && objecttype && objectid) {
          if (objectid.value == this.previousRoomId && objecttype.value == 'ROOM' &&
            this.previousRoomColor != null && this.previousRoomId != null) {
            let color = this.previousRoomColor;
            // @ts-ignore
            d3.select(children[i]).style('fill', d3.color(color.value));
            d3.select(children[i]).on('mouseover', function () {
              // @ts-ignore
              d3.select(children[i]).style('fill', d3.color(color.value).darker());
            }).on('mouseout', function () {
              // @ts-ignore
              d3.select(children[i]).style('fill', d3.color(color.value));
            });
            children[i].classList.remove('navigated-path-animation');
            children[i].classList.add('path-animation');
          }
        }
      }
    })
  }

  resetDisplayingAdditionalElements() {

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

