import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropsearchComponent } from './dropsearch.component';

describe('DropsearchComponent', () => {
  let component: DropsearchComponent;
  let fixture: ComponentFixture<DropsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
