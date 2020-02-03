import {Component, Input, OnInit} from '@angular/core';
import {SearchingService} from '../../services/searching.service';
import {MapService} from '../../services/map.service';
import {MinimizeButtonService} from '../../services/minimize-button.service';

@Component({
  selector: 'app-room-employee-info',
  templateUrl: './room-employee-info.component.html',
  styleUrls: ['./room-employee-info.component.css']
})
export class RoomEmployeeInfoComponent implements OnInit {
  @Input() private transform: boolean = false;

  constructor(public searchingService: SearchingService, public mapService: MapService,
              public minimizeService: MinimizeButtonService) {
  }

  ngOnInit() {
  }

  closeInfoBox() {

    if (this.searchingService.numberOfClicks == 1) {
      this.searchingService.resetInfoData();
      this.searchingService.clickedListItem = false;
    } else {
      this.searchingService.numberOfClicks = 1;
    }

  }


  async navigateToRoom(object) {
    this.searchingService.resetInfoData();
    this.searchingService.clickedListItem = false;
    this.minimizeService.ifMinimize = true;
    await this.mapService.displayRoomOnMap(object);
  }

  async navigateToEmployeeRoom(roomId: number) {
    this.searchingService.resetInfoData();
    this.searchingService.clickedListItem = false;
    this.minimizeService.ifMinimize = true;
    await this.searchingService.getEmployeeRoomInfoData(roomId).subscribe((data) => {
        data = Array.of(data);
        if (data != null) {
          this.mapService.displayRoomOnMap(data['0']);
        } else {
          console.log('No data of employee room');
        }
      }
    )
  }

}
