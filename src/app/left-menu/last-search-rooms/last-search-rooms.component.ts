import { Component, OnInit } from '@angular/core';
import {SearchingService} from '../../services/searching.service';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-last-search-rooms',
  templateUrl: './last-search-rooms.component.html',
  styleUrls: ['./last-search-rooms.component.css']
})
export class LastSearchRoomsComponent implements OnInit {

  constructor(public searchingService: SearchingService, public mapService: MapService) { }

  ngOnInit() {
  }

  async navigate(object) {
    await this.mapService.displayRoomOnMap(object);
  }
}
