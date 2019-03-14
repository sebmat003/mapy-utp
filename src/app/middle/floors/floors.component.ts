import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.css']
})
export class FloorsComponent implements OnInit {

  @Input() private transform: boolean = false;
  public floorState: number = 0;


  constructor() {
  }

  ngOnInit() {
  }


  onClickFloor(number: number) {
    this.floorState = number;
  }
}
