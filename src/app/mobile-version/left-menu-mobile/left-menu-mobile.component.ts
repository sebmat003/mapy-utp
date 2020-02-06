import {Component, OnInit} from '@angular/core';
import {MenuMobileService} from '../../services/menu-mobile.service';
import {TranslateService} from '@ngx-translate/core';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-left-menu-mobile',
  templateUrl: './left-menu-mobile.component.html',
  styleUrls: ['./left-menu-mobile.component.css']
})
export class LeftMenuMobileComponent implements OnInit {
  showLeftMenu: boolean = false;
  changeFlag: boolean = false;

  constructor(private LeftMenuMobileService: MenuMobileService,
              private translateService: TranslateService,
              private mapService: MapService) { }

  ngOnInit() {
    this.LeftMenuMobileService.showLeftMenu
      .subscribe((value)=>{
        this.showLeftMenu = value;
      })
  }

  onClickBackground() {
    this.showLeftMenu = false;
    this.LeftMenuMobileService.showLeftMenu.emit(false);
  }

  changeLanguage() {
    this.changeFlag = !this.changeFlag;
    if (this.changeFlag) {
      this.translateService.setDefaultLang('en');
    } else {
      this.translateService.setDefaultLang('pl');
    }
  }

  clickElement(type: string) {
    this.mapService.setValueOfDisplayedAdditionalElement(true);
    this.mapService.displayAdditionalElementsOnMap(type);
  }
}
