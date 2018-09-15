import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasFinalizarComponent } from './horas-finalizar.component';

describe('HorasFinalizarComponent', () => {
  let component: HorasFinalizarComponent;
  let fixture: ComponentFixture<HorasFinalizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasFinalizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasFinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
