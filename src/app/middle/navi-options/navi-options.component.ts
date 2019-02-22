import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navi-options',
  templateUrl: './navi-options.component.html',
  styleUrls: ['./navi-options.component.css']
})
export class NaviOptionsComponent implements OnInit {
  @Input() private transform: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
