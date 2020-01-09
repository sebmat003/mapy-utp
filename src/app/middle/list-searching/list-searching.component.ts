import {Component, Input, OnInit} from '@angular/core';
import {MinimizeButtonService} from '../../services/minimize-button.service';
import {SearchingService} from '../../services/searching.service';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-list-searching',
  templateUrl: './list-searching.component.html',
  styleUrls: ['./list-searching.component.css']
})
export class ListSearchingComponent implements OnInit {
  @Input() private transform: boolean = false;


  constructor(public minimizeButtonService: MinimizeButtonService,
              public searchingService: SearchingService,
              public mapService: MapService,
              public minimizeService: MinimizeButtonService) { }

  ngOnInit() {
  }

  clickedItem(text: string, type: number) {

    if(type == 1) {
      this.searchingService.getRoomInfoData(text);
    } else if(type == 2) {
      this.searchingService.getEmployeeInfoData(text);
    }

    this.searchingService.clickedListItem = true;
  }


  async navigateRoom(locationId: number, floorName: string, roomId: number) {
    this.searchingService.clickedListItem = false;
    this.searchingService.resetInfoData();
    this.searchingService.clickedListItem = false;
    this.minimizeService.ifMinimize = true;
    await this.mapService.displayRoomOnMap(locationId, floorName, roomId);
  }

  async navigateEmployeeRoom(roomId: number) {
    this.searchingService.clickedListItem = false;
    this.searchingService.resetInfoData();
    this.searchingService.clickedListItem = false;
    this.minimizeService.ifMinimize = true;
    await this.searchingService.getEmployeeRoomInfoData(roomId).subscribe((data) => {
        data = Array.of(data);
        if (data != null) {
          let locationId = data['0'].campusId;
          let floorName = data['0'].floorName;
          this.mapService.displayRoomOnMap(locationId, floorName, roomId);
        } else {
          console.log('No data of employee room');
        }
      }
    )
  }
}
