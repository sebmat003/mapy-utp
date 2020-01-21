import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingComponent } from './searching.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormFieldModule, MatSelectModule, MatTableModule} from '@angular/material';
import {MenuMobileService} from '../../services/menu-mobile.service';
import {MinimizeButtonService} from '../../services/minimize-button.service';
import {SearchingService} from '../../services/searching.service';
import {HttpClientModule} from '@angular/common/http';


describe('SearchingComponent', () => {
  let component: SearchingComponent;
  let fixture: ComponentFixture<SearchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchingComponent ],
      imports: [
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        HttpClientModule
      ],
      providers: [
        MenuMobileService,
        MinimizeButtonService,
        SearchingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
