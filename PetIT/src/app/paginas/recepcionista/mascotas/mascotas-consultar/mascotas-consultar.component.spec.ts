import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasConsultarComponent } from './mascotas-consultar.component';

describe('MascotasConsultarComponent', () => {
  let component: MascotasConsultarComponent;
  let fixture: ComponentFixture<MascotasConsultarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasConsultarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
