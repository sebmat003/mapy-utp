import {Component, Input, OnInit} from '@angular/core';
import {MinimizeButtonService} from '../../services/minimize-button.service';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-navi-options',
  templateUrl: './navi-options.component.html',
  styleUrls: ['./navi-options.component.css']
})
export class NaviOptionsComponent implements OnInit {
  @Input() private transform: boolean = false;
  clickedElement: number;


  constructor( public minimizeButtonService: MinimizeButtonService,
               public mapService: MapService) { }

  ngOnInit() {

  }


  click(type: string, numberOfElement: number) {
    if(this.clickedElement != numberOfElement){
      this.clickedElement = numberOfElement;
      this.mapService.displayAdditionalElement = true;
      this.mapService.displayAdditionalElementsOnMap(type);
    } else {
      this.clickedElement = NaN;
      this.mapService.displayAdditionalElement = false;
      this.mapService.resetDisplayingAdditionalElements();
    }
  }
}
