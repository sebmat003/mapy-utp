import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  time: number = Date.now();

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.time = Date.now();
    }, 1000)
  }

}
