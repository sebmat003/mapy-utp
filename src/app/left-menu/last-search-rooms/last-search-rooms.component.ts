import { Component, OnInit } from '@angular/core';
import {SearchingService} from '../../services/searching.service';
import {MapService} from '../../services/map.service';
import {MinimizeButtonService} from '../../services/minimize-button.service';

@Component({
  selector: 'app-last-search-rooms',
  templateUrl: './last-search-rooms.component.html',
  styleUrls: ['./last-search-rooms.component.css']
})
export class LastSearchRoomsComponent implements OnInit {

  constructor(public searchingService: SearchingService,
              public mapService: MapService,
              public minimizeService: MinimizeButtonService) { }

  ngOnInit() {
  }

  async navigate(object) {
    this.minimizeService.ifMinimize = true;
    await this.mapService.displayRoomOnMap(object);
  }
}
