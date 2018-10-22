import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquesConsultarComponent } from './bloques-consultar.component';

describe('BloquesConsultarComponent', () => {
  let component: BloquesConsultarComponent;
  let fixture: ComponentFixture<BloquesConsultarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloquesConsultarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloquesConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
