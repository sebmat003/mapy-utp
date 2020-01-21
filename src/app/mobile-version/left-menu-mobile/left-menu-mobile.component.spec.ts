import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMenuMobileComponent } from './left-menu-mobile.component';
import {LogoComponent} from '../../left-menu/logo/logo.component';
import {TranslateModule} from '@ngx-translate/core';
import {MenuMobileService} from '../../services/menu-mobile.service';

describe('LeftMenuMobileComponent', () => {
  let component: LeftMenuMobileComponent;
  let fixture: ComponentFixture<LeftMenuMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LeftMenuMobileComponent,
        LogoComponent
      ],
      providers: [
        MenuMobileService
      ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
