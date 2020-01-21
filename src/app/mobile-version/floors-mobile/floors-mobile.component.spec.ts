import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorsMobileComponent } from './floors-mobile.component';
import {TranslateModule} from '@ngx-translate/core';
import {FloorsService} from '../../services/floors.service';

describe('FloorsMobileComponent', () => {
  let component: FloorsMobileComponent;
  let fixture: ComponentFixture<FloorsMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorsMobileComponent ],
      imports: [TranslateModule.forRoot()],
      providers: [
        FloorsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
