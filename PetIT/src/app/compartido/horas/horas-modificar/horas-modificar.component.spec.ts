import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasModificarComponent } from './horas-modificar.component';

describe('HorasModificarComponent', () => {
  let component: HorasModificarComponent;
  let fixture: ComponentFixture<HorasModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
