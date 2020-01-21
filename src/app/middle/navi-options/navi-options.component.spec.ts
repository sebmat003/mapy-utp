import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviOptionsComponent } from './navi-options.component';
import {TranslateModule} from '@ngx-translate/core';
import {MinimizeButtonService} from '../../services/minimize-button.service';

describe('NaviOptionsComponent', () => {
  let component: NaviOptionsComponent;
  let fixture: ComponentFixture<NaviOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaviOptionsComponent ],
      imports: [TranslateModule.forRoot()],
      providers: [
        MinimizeButtonService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaviOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
