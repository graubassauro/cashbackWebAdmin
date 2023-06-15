import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficsDataComponent } from './grafics-data.component';

describe('GraficsDataComponent', () => {
  let component: GraficsDataComponent;
  let fixture: ComponentFixture<GraficsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
