import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSearchRoomsComponent } from './last-search-rooms.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchingService} from '../../services/searching.service';
import {HttpClientModule} from '@angular/common/http';

describe('LastSearchRoomsComponent', () => {
  let component: LastSearchRoomsComponent;
  let fixture: ComponentFixture<LastSearchRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastSearchRoomsComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        SearchingService,

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSearchRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
