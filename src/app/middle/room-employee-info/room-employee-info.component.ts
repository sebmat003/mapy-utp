import {Component, Input, OnInit} from '@angular/core';
import {SearchingService} from '../../services/searching.service';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-room-employee-info',
  templateUrl: './room-employee-info.component.html',
  styleUrls: ['./room-employee-info.component.css']
})
export class RoomEmployeeInfoComponent implements OnInit {
  @Input() private transform: boolean = false;


  constructor(public searchingService: SearchingService, public mapService: MapService) {
  }

  ngOnInit() {
  }

  closeInfoBox() {

    if(this.searchingService.numberOfClicks == 1) {
      this.searchingService.resetInfoData();
      this.searchingService.clickedListItem = false;
    } else this.searchingService.numberOfClicks = 1;

  }

  navigateToRoom(locationId: number, floorName: string, roomId: number ) {
    this.mapService.displayRoomOnMap(locationId, floorName, roomId);
  }

  navigateToEmployeeRoom(roomId: number) {

  }
}
