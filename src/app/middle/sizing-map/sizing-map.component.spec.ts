import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizingMapComponent } from './sizing-map.component';

describe('SizingMapComponent', () => {
  let component: SizingMapComponent;
  let fixture: ComponentFixture<SizingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
