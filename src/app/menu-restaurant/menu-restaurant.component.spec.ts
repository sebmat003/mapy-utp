import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestaurantComponent } from './menu-restaurant.component';
import {TranslateModule} from '@ngx-translate/core';
import {MenuRestaurantService} from '../services/menu-restaurant.service';
import {HttpClientModule} from '@angular/common/http';
import {PdfViewerModule} from 'ng2-pdf-viewer';

describe('MenuRestaurantComponent', () => {
  let component: MenuRestaurantComponent;
  let fixture: ComponentFixture<MenuRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRestaurantComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule,
        PdfViewerModule
      ],
      providers: [
        MenuRestaurantService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
