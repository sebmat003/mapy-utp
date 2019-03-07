import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {

  private openState: boolean = true;
  time: number = Date.now();

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.time = Date.now();
    }, 1000)
  }

}
