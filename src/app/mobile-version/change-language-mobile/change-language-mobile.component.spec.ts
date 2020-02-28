import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguageMobileComponent } from './change-language-mobile.component';

describe('ChangeLanguageMobileComponent', () => {
  let component: ChangeLanguageMobileComponent;
  let fixture: ComponentFixture<ChangeLanguageMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLanguageMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLanguageMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
