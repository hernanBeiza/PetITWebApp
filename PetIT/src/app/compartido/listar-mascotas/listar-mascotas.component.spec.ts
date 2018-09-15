import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMascotas } from './listar-mascotas.component';

describe('ListarMascotas', () => {
  let component: ListarMascotas;
  let fixture: ComponentFixture<ListarMascotas>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarMascotas ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMascotas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
