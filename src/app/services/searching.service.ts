import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';

@Injectable()
export class SearchingService {

  transform: boolean = true;

  // three options in main search input
  // 1 - common searching
  // 2 - search by employee
  // 3 - search by room/building
  public searchingState: number = 1;
  valueOfFirstInputSource: Subject<string> = new Subject<string>();
  public valueOfFirstInput = this.valueOfFirstInputSource.asObservable();

  unitsUrl = 'https://api.kb.utp.edu.pl/search-provider/structure/all';
  unitsData = null;
  employeesUrl = 'https://api-dev.kb.utp.edu.pl/search-provider/employee/find-all-by-sub-unit-code?subUnitCode=';
  employeesInUnitData = null;
  employeeInfoData = null;
  employeeInfoUrl = 'https://api-dev.kb.utp.edu.pl/search-provider/employee?phrase=';
  consultations = null;
  roomAndEmployeeData = null;
  roomAndEmployeeUrl = 'https://api-dev.kb.utp.edu.pl/search-provider/common/search?phrase=';
  campusData = null;
  campusUrl = 'https://api-dev.kb.utp.edu.pl/space-manager/api/v1/campus?sortField=name&sortDirection=ASC';
  buildingData = null;
  buildingUrl1 = 'https://api-dev.kb.utp.edu.pl/space-manager/api/v1/building/campus/';
  buildingUrl2 = '?sortField=name&sortDirection=ASC';
  floorData = null;
  floorUrl1 = 'https://api-dev.kb.utp.edu.pl/space-manager/api/v1/floor/building/';
  floorUrl2 = '?sortField=name&sortDirection=ASC';
  roomsUrl = 'https://api-dev.kb.utp.edu.pl/search-provider/room/search/filter?';
  roomsData = null;
  roomInfoUrl = 'https://api-dev.kb.utp.edu.pl/search-provider/room?roomId=';
  roomInfoData = null;
  employeeRoomInfoData = null;

  //info component about employee/room
  numberOfClicks: number = 1;
  clickedListItem = false;

  lastSearchRooms = [];

  constructor(private httpClient: HttpClient, private translateService: TranslateService) {
    this.httpClient.get(this.unitsUrl, {responseType: 'json'})
      .subscribe((data) => {
        this.unitsData = data;
      });
    this.httpClient.get(this.campusUrl, {responseType: 'json'})
      .subscribe((data) => {
        this.campusData = data;
      });
}


  navigateToRoomInformation(roomNumber: number){
    let lang = this.translateService.getDefaultLang();
    if (roomNumber != null) {
      if (lang == 'pl') {
        this.setValueOfFirstInput("Prowadzę do: " + roomNumber);
      } else if (lang == 'en') {
        this.setValueOfFirstInput("Navigating to: " + roomNumber);
      }
    }
  }

  navigateToAdditionalElementInformation(type: string) {
    let lang = this.translateService.getDefaultLang();
    if (type != null) {
      if (lang == 'pl') {
        let typeTranslate = '';
        switch(type) {
          case 'AED': typeTranslate = 'Pierwsza pomoc'; break;
          case 'CASH_MACHINE': typeTranslate = 'Bankomaty'; break;
          case 'ELEVATOR': typeTranslate = 'Windy'; break;
          case 'FOOD': typeTranslate = 'Restauracje'; break;
          case 'PHOTOCOPY': typeTranslate = 'Ksero'; break;
          case 'CLOAKROOM': typeTranslate = 'Szatnie'; break;
          case 'TOILET': typeTranslate = 'Toalety'; break;
        }
        this.setValueOfFirstInput("Prowadzę do: " + typeTranslate);
      } else if (lang == 'en') {
        let typeTranslate = '';
        switch(type) {
          case 'AED': typeTranslate = 'First aid'; break;
          case 'CASH_MACHINE': typeTranslate = 'Cash machines'; break;
          case 'ELEVATOR': typeTranslate = 'Elevators'; break;
          case 'FOOD': typeTranslate = 'Restaurants'; break;
          case 'PHOTOCOPY': typeTranslate = 'Xero'; break;
          case 'CLOAKROOM': typeTranslate = 'Cloakrooms'; break;
          case 'TOILET': typeTranslate = 'Toilets'; break;
        }
        this.setValueOfFirstInput("Navigating to: " + typeTranslate);
      }
    }
  }

  insertObjectIntoLastRooms(object) {

    if(this.lastSearchRooms.length != 0) {
      let duplicatedRoom = false;
      this.lastSearchRooms.forEach( (item)=> {
        if(item.roomId == object.roomId) duplicatedRoom = true;
      });
      if(!duplicatedRoom) this.lastSearchRooms.unshift(object);
    } else {
      this.lastSearchRooms.push(object);
    }


    if(this.lastSearchRooms.length > 5) {
      this.lastSearchRooms.pop();
    }

  }

  getRoomAndEmployeeData(text: string) {
    this.employeesInUnitData = null;
    this.httpClient.get(this.roomAndEmployeeUrl + text, {responseType: 'json'})
      .subscribe((data) => {
        this.roomAndEmployeeData = data;
      });
  }

  getEmployeesData(unitId: string | number) {
    this.httpClient.get(this.employeesUrl + unitId, {responseType: 'json'})
      .subscribe((data) => {
        this.employeesInUnitData = data;
      });
  }

  getEmployeeInfoData(text: string) {
    this.httpClient.get(this.employeeInfoUrl + text, {responseType: 'json'})
      .subscribe((data) => {
        this.employeeInfoData = data['0'];
        let cons = data['0'].additionalData['0'].consultations;
        if (cons !== null) {
          this.consultations = Object.entries(cons).map((e) => ({[e[0]]: e[1]}));
        }
      });
  }

  getCampusData() {
    this.httpClient.get(this.campusUrl, {responseType: 'json'})
      .subscribe((data) => {
        this.campusData = data;
      });
  }

  getBuildingData(id: string | number) {
    this.httpClient.get(this.buildingUrl1 + id + this.buildingUrl2, {responseType: 'json'})
      .subscribe((data) => {
        this.buildingData = data;
      });
  }

  getFloorData(id: string | number) {
    this.httpClient.get(this.floorUrl1 + id + this.floorUrl2, {responseType: 'json'})
      .subscribe((data) => {
        this.floorData = data;
      });
  }

  getRoomsData(campusId: string | number, buildingId: string | number, floorId: string | number) {
    if (campusId !== null && buildingId !== null && floorId !== null) {
      this.httpClient.get(this.roomsUrl + 'campusId=' + campusId +
        '&buildingId=' + buildingId + '&floorId=' + floorId, {responseType: 'json'})
        .subscribe((data) => {
          this.roomsData = data;
        });
    } else {
      this.roomsData = null;
    }
  }

  getRoomInfoData(id: string | number) {
    this.httpClient.get(this.roomInfoUrl + id, {responseType: 'json'})
      .subscribe((data) => {
        this.roomInfoData = Array.of(data);
      });
  }

  getEmployeeRoomInfoData(id: number) {
    return this.httpClient.get(this.roomInfoUrl + id, {responseType: 'json'})
  }

  resetData() {
    switch (this.searchingState) {
      case 1:
        this.roomAndEmployeeData = null;
        break;
      case 2:
        this.employeesInUnitData = null;
        break;
      case 3: {
        this.buildingData = null;
        this.floorData = null;
        this.roomsData = null;
      }
    }
  }

  resetInfoData() {
    this.roomInfoData = null;
    this.employeeInfoData = null;
    this.employeeRoomInfoData = null;
  }

  resetFirstInput() {
    this.setValueOfFirstInput('');
  }

  setValueOfFirstInput(newValue: string) {
    this.valueOfFirstInputSource.next(newValue);
  }


}
