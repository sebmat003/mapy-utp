import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchingService} from '../services/searching.service';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  @Input() private transform: boolean = false;

  constructor(private searchingService: SearchingService) { }

  ngOnInit() {
  }

  toggleMenu () {
    this.searchingService.transform = !this.searchingService.transform;
  }
}
