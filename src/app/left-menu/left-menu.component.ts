import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  private showLeftMenu: boolean = false;
  @Output() emitStateMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggleMenu () {
    this.showLeftMenu = !this.showLeftMenu;
    this.emitStateMenu.emit(this.showLeftMenu);
  }
}
