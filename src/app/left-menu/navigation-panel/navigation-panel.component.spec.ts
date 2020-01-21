import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPanelComponent } from './navigation-panel.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchingService} from '../../services/searching.service';
import {HttpClientModule} from '@angular/common/http';

describe('NavigationPanelComponent', () => {
  let component: NavigationPanelComponent;
  let fixture: ComponentFixture<NavigationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationPanelComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        SearchingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
