import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  private showLeftMenu: boolean = true;
  @Output() emitStateMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.emitStateMenu.emit(this.showLeftMenu);
  }

  toggleMenu () {
    this.showLeftMenu = !this.showLeftMenu;
    this.emitStateMenu.emit(this.showLeftMenu);
  }
}
