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

  constructor(
              public searchingService: SearchingService,
              public mapService: MapService,
              public minimizeService: MinimizeButtonService) {
  }

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


  async navigateRoom(object) {
    this.searchingService.clickedListItem = false;
    this.searchingService.resetInfoData();
    this.searchingService.clickedListItem = false;
    this.minimizeService.ifMinimize = true;
    await this.mapService.displayRoomOnMap(object);
  }

  async navigateEmployeeRoom(roomId: number) {
    this.searchingService.clickedListItem = false;
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
