import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasListar } from './mascotas-listar.component';

describe('MascotasListar', () => {
  let component: MascotasListar;
  let fixture: ComponentFixture<MascotasListar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasListar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasListar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
