import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
  @Input() private transform: boolean = false;
  private display: boolean = false;

  constructor() { }


  ngOnInit() {
  }

}
