import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EraseAlertComponent } from './erase-alert.component';

describe('EraseAlertComponent', () => {
  let component: EraseAlertComponent;
  let fixture: ComponentFixture<EraseAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EraseAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EraseAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
