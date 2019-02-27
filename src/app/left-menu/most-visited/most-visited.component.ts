import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-most-visited',
  templateUrl: './most-visited.component.html',
  styleUrls: ['./most-visited.component.css']
})
export class MostVisitedComponent implements OnInit {

  private activeState : number = 1;

  constructor() { }

  ngOnInit() {
  }

}
