import {Component, OnInit} from '@angular/core';
import {MenuMobileService} from '../../services/menu-mobile.service';

@Component({
  selector: 'app-left-menu-mobile',
  templateUrl: './left-menu-mobile.component.html',
  styleUrls: ['./left-menu-mobile.component.css']
})
export class LeftMenuMobileComponent implements OnInit {
  showLeftMenu: boolean = false;

  constructor(private LeftMenuMobileService: MenuMobileService) { }

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
}
