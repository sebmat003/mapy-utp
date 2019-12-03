import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSearchingComponent } from './list-searching.component';

describe('ListSearchingComponent', () => {
  let component: ListSearchingComponent;
  let fixture: ComponentFixture<ListSearchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSearchingComponent ]
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
