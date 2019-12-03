import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFloorsComponent } from './change-floors.component';

describe('ChangeFloorsComponent', () => {
  let component: ChangeFloorsComponent;
  let fixture: ComponentFixture<ChangeFloorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeFloorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
