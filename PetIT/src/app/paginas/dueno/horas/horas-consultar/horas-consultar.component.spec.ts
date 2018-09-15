import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasConsultarComponent } from './horas-consultar.component';

describe('HorasConsultarComponent', () => {
  let component: HorasConsultarComponent;
  let fixture: ComponentFixture<HorasConsultarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasConsultarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
