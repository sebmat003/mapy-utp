import { Component, OnInit } from '@angular/core';
import {FloorsService} from '../../services/floors.service';

@Component({
  selector: 'app-floors-mobile',
  templateUrl: './floors-mobile.component.html',
  styleUrls: ['./floors-mobile.component.css']
})
export class FloorsMobileComponent implements OnInit {

  constructor(private FloorsService: FloorsService) { }

  ngOnInit() {
  }

  openFloors() {
    this.FloorsService.showFloors = true;
    this.FloorsService.clickedButton = 0;
  }
}
