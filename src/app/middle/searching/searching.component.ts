import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MenuMobileService} from '../../services/menu-mobile.service';
import {MinimizeButtonService} from '../../services/minimize-button.service';
import {SearchingService} from '../../services/searching.service';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css'],
})
export class SearchingComponent implements OnInit {
  @Input() private transform: boolean = false;

  valueFirstInput: string = '';

  private display: boolean = false;
  clicked: number = 0;
  private innerWidth: number;
  mobileVersion: boolean = false;
  public started: boolean = false;
  vSearch: any = null;
  unitOptionValue: any;
  buildingOptionValue: any;
  floorOptionValue: any;

  //variables for dropdowns
  unitSelected = false;
  campusSelected = false;
  buildingSelected = false;
  campusId = null;
  buildingId = null;
  floorId = null;

  constructor(private LeftMenuMobileService: MenuMobileService, public minimizeButtonService: MinimizeButtonService,
              public searchingService: SearchingService) {
    this.onResize();
  }
  ngOnInit() {
    this.searchingService.valueOfFirstInput
      .subscribe((value) => {
        this.valueFirstInput = value;
      });
    this.onResize();
  }

  click() {
    this.display = !this.display;
    this.clicked = 0;
    this.searchingService.resetFirstInput();
  }

  microphone() {
    if (!this.started) {
      const {webkitSpeechRecognition}: IWindow = <IWindow>window;
      if (webkitSpeechRecognition != undefined) {
        this.started = true;
        this.searchingService.resetFirstInput();
        this.vSearch = new webkitSpeechRecognition();
        this.vSearch.continuous = false;
        this.vSearch.interimresults = false;
        this.vSearch.lang = 'pl-PL';
        this.vSearch.start();
        this.vSearch.onresult = (e) => {
          this.searchingService.setValueOfFirstInput(e.results[0][0].transcript);
          this.vSearch.stop();
          this.started = false;
          this.searchingService.getRoomAndEmployeeData(this.valueFirstInput);
        };
      }
    } else {
      this.vSearch.stop();
      this.started = false;
    }
  }

  closeMenu() {
    if (this.display) {
      if (this.clicked == 1) {
        this.display = false;
      } else {
        this.clicked = 1;
      }
    }

  }

  dropdownClick(number: number) {
    this.searchingService.searchingState = number;
    this.display = false;
    this.searchingService.resetFirstInput();
    this.searchingService.resetData();
    this.unitSelected = false;
    this.campusSelected = false;
    this.buildingSelected = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.mobileVersion = this.innerWidth <= 1000;
  }


  onShowMobileMenu() {
    this.LeftMenuMobileService.showLeftMenu.emit(true);
  }

  clickedSubUnit(subUnitId: string | number) {
    this.searchingService.getEmployeesData(subUnitId);
    this.minimizeButtonService.ifMinimize = false;
  }


  //state = 2 , searching employees
  clickedFirstOption(index: any, unitItem: any) {
    this.unitSelected = true;
    this.unitOptionValue = null;
    this.searchingService.resetData();
  }

  //state = 3, searching rooms
  clickedCampus(campusId: number | string) {
    this.campusId = campusId;
    this.campusSelected = true;
    this.searchingService.getBuildingData(this.campusId);
    this.buildingId = null;
    this.floorId = null;

    //only for resetting data state
    this.buildingOptionValue = null;
    this.floorOptionValue = null;
    this.searchingService.getRoomsData(this.campusId, this.buildingId, this.floorId);


  }

  //state = 3, searching rooms
  clickedBuilding(buildingId: number | string) {
    this.buildingId = buildingId;
    this.buildingSelected = true;
    this.searchingService.getFloorData(this.buildingId);
    this.floorId = null;

    //only for resetting data state
    this.floorOptionValue = null;
    this.searchingService.getRoomsData(this.campusId, this.buildingId, this.floorId);

  }

  //state = 3, searching rooms
  clickedFloor(floorId: number | string) {
    this.floorId = floorId;
    this.searchingService.getRoomsData(this.campusId, this.buildingId, this.floorId);
    this.minimizeButtonService.ifMinimize = false;
  }


}
