import { Component, OnInit } from '@angular/core';
import {MenuRestaurantService} from '../services/menu-restaurant.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu-restaurant',
  templateUrl: './menu-restaurant.component.html',
  styleUrls: ['./menu-restaurant.component.css']
})
export class MenuRestaurantComponent implements OnInit {

  pdfSrc: string = 'http://www.lewiccy.com/plik-menu-01/restauracja-uniwersytecka';

  constructor(private MenuRestaurantService: MenuRestaurantService,
              private httpClient: HttpClient) { }

  ngOnInit() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    headers = headers.set('Access-Control-Allow-Origin', 'true');
    headers = headers.set('Access-Control-Allow-Credentials', 'true');
    return this.httpClient.get(this.pdfSrc, { headers: headers, responseType: 'blob' });

  }

  onClose() {
    if(this.MenuRestaurantService.clickButtonMenu == 1) {
      this.MenuRestaurantService.showMenu = false;
    } else this.MenuRestaurantService.clickButtonMenu = 1;
  }
}
