import { Component, OnInit } from '@angular/core';
import {SearchingService} from '../../services/searching.service';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.css']
})
export class NavigationPanelComponent implements OnInit {

  constructor(public searchingService: SearchingService) { }

  ngOnInit() {
  }

}
