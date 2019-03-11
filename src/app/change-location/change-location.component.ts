import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.css']
})
export class ChangeLocationComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.ngOnDestroy();
  }

  ngOnDestroy() {

  }
}
