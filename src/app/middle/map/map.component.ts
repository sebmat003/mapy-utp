import { Component, OnInit } from '@angular/core';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapImage : any;
  private isMapLoading: boolean;
  dummyUrl: string = 'http://maps.utp.edu.pl/api/maps/KAL1/svg/LEVEL_0.svg';

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.getMapFromAPI();
  }

  createMapFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", ()=> {
      this.mapImage = reader.result;
    }, false);
    if(image) {
      reader.readAsDataURL(image);

    }
    console.log(image);
  }

  getMapFromAPI() {
    this.isMapLoading = true;
    this.mapService.getMapImage(this.dummyUrl)
      .subscribe( (data) => {
        this.createMapFromBlob(data);
        this.isMapLoading = false;
      },
        error => {
          this.isMapLoading = false;
          console.log("Map loading error " + error);
        })
  }

}
