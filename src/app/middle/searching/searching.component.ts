import {Component,HostListener, Input, OnInit} from '@angular/core';
import {MenuMobileService} from '../../services/menu-mobile.service';



@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css'],
})
export class SearchingComponent implements OnInit {
  @Input() private transform: boolean = false;
  private display: boolean = false;
  searchingState: number = 1;
  clicked: number = 0;
  private innerWidth: number;
  mobileVersion: boolean = false;


  constructor(private LeftMenuMobileService: MenuMobileService) {
    this.onResize();
  }


  ngOnInit() {
    this.onResize();
  }

  click() {
    this.display = !this.display;
    this.clicked = 0;
  }

  microphone() {
    console.log('enable microphone');
  }

  closeMenu() {
    if(this.display) {
      if(this.clicked == 1) {
        this.display = false;
      } else this.clicked = 1;
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.mobileVersion = this.innerWidth <= 1000;
  }


  onShowMobileMenu() {
    this.LeftMenuMobileService.showLeftMenu.emit(true);
  }
}
