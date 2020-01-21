import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelComponent } from './search-panel.component';
import {SearchingService} from '../../services/searching.service';
import {TranslateModule} from '@ngx-translate/core';
import {FilterPipe} from '../../pipes/filter.pipe';
import {HttpClientModule} from '@angular/common/http';

describe('SearchPanelComponent', () => {
  let component: SearchPanelComponent;
  let fixture: ComponentFixture<SearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPanelComponent, FilterPipe ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        SearchingService,
        FilterPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
