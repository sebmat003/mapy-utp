import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSearchingComponent } from './list-searching.component';
import {TranslateModule} from '@ngx-translate/core';
import {MinimizeButtonService} from '../../services/minimize-button.service';
import {SearchingService} from '../../services/searching.service';
import {MapService} from '../../services/map.service';
import {HttpClientModule} from '@angular/common/http';
import {LocationService} from '../../services/location.service';
import {FloorsService} from '../../services/floors.service';

describe('ListSearchingComponent', () => {
  let component: ListSearchingComponent;
  let fixture: ComponentFixture<ListSearchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSearchingComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        SearchingService,
        MapService,
        LocationService,
        FloorsService,
        MinimizeButtonService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
