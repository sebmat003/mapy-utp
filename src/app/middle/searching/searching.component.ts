import {Component, Input, OnInit} from '@angular/core';



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

  constructor() { }


  ngOnInit() {
  }

  click() {
    this.display = !this.display;
    this.clicked = 0;
  }

  closeMenu() {
    if(this.display) {
      if(this.clicked == 1) {
        this.display = false;
      } else this.clicked = 1;
    }

  }


}
