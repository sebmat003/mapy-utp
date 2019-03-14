import { Component, OnInit } from '@angular/core';
import {MenuRestaurantService} from '../../services/menu-restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(private MenuRestaurantService: MenuRestaurantService) { }

  ngOnInit() {
  }

  onClickMenu() {
    this.MenuRestaurantService.showMenu = true;
    this.MenuRestaurantService.clickButtonMenu = 0;
  }
}
