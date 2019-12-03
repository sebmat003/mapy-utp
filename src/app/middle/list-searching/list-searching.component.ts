import {Component, Input, OnInit} from '@angular/core';
import {MinimizeButtonService} from '../../services/minimize-button.service';
import {SearchingService} from '../../services/searching.service';

@Component({
  selector: 'app-list-searching',
  templateUrl: './list-searching.component.html',
  styleUrls: ['./list-searching.component.css']
})
export class ListSearchingComponent implements OnInit {
  @Input() private transform: boolean = false;


  constructor(public minimizeButtonService: MinimizeButtonService,
              public searchingService: SearchingService) { }

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

  navigate() {
    this.searchingService.clickedListItem = false;
  }
}
