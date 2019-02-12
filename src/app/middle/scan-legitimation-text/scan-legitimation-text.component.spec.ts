import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanLegitimationTextComponent } from './scan-legitimation-text.component';

describe('ScanLegitimationTextComponent', () => {
  let component: ScanLegitimationTextComponent;
  let fixture: ComponentFixture<ScanLegitimationTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanLegitimationTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanLegitimationTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
