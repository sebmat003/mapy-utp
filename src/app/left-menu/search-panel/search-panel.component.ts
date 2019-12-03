import { Component, OnInit } from '@angular/core';
import {SearchingService} from '../../services/searching.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {


  constructor(public searchingService: SearchingService) { }

  ngOnInit() {
  }

}
