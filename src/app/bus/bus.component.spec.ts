import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusComponent } from './bus.component';
import {BusItemComponent} from './bus-item/bus-item.component';
import {TranslateModule} from '@ngx-translate/core';

describe('BusComponent', () => {
  let component: BusComponent;
  let fixture: ComponentFixture<BusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusComponent,
        BusItemComponent
      ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
