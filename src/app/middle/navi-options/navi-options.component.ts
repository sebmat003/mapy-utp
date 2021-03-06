import {Component, Input, OnInit} from '@angular/core';
import {MinimizeButtonService} from '../../services/minimize-button.service';
import {MapService} from '../../services/map.service';
import {SearchingService} from '../../services/searching.service';

@Component({
  selector: 'app-navi-options',
  templateUrl: './navi-options.component.html',
  styleUrls: ['./navi-options.component.css']
})
export class NaviOptionsComponent implements OnInit {
  @Input() private transform: boolean = false;
  clickedElement: number;
  displayAdditionalElement: boolean;

  constructor( public minimizeButtonService: MinimizeButtonService,
               public mapService: MapService,
               private searchingService: SearchingService) { }

  ngOnInit() {
    this.mapService.getValueOfDisplayedAdditionalElement()
      .subscribe( (value) => {
        this.displayAdditionalElement = value;
        if(!value) this.clickedElement = NaN;
      });
  }

  click(type: string, numberOfElement: number) {
    if(this.clickedElement != numberOfElement){
      this.clickedElement = numberOfElement;
      this.mapService.setValueOfDisplayedAdditionalElement(true);
      this.minimizeButtonService.ifMinimize = true;
      this.mapService.displayAdditionalElementsOnMap(type);
    } else {
      this.clickedElement = NaN;
      this.minimizeButtonService.ifMinimize = false;
      this.searchingService.resetFirstInput();
      this.mapService.setValueOfDisplayedAdditionalElement(false);
      this.mapService.resetDisplayingAdditionalElements();
    }
  }
}
