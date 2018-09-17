import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasAgendarComponent } from './horas-agendar.component';

describe('HorasAgendarComponent', () => {
  let component: HorasAgendarComponent;
  let fixture: ComponentFixture<HorasAgendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasAgendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasAgendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
