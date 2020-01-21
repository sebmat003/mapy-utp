import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMenuComponent } from './left-menu.component';
import {LogoComponent} from './logo/logo.component';
import {LastSearchRoomsComponent} from './last-search-rooms/last-search-rooms.component';
import {MostVisitedComponent} from './most-visited/most-visited.component';
import {RestaurantComponent} from './restaurant/restaurant.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchingService} from '../services/searching.service';
import {HttpClientModule} from '@angular/common/http';
import {MenuRestaurantService} from '../services/menu-restaurant.service';

describe('LeftMenuComponent', () => {
  let component: LeftMenuComponent;
  let fixture: ComponentFixture<LeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LeftMenuComponent,
        LogoComponent,
        LastSearchRoomsComponent,
        MostVisitedComponent,
        RestaurantComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        SearchingService,
        MenuRestaurantService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
