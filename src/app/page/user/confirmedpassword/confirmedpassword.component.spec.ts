import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedpasswordComponent } from './confirmedpassword.component';

describe('ConfirmedpasswordComponent', () => {
  let component: ConfirmedpasswordComponent;
  let fixture: ComponentFixture<ConfirmedpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmedpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
