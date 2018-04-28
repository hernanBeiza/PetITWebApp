import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEncontradosComponent } from './lista-encontrados.component';

describe('ListaEncontradosComponent', () => {
  let component: ListaEncontradosComponent;
  let fixture: ComponentFixture<ListaEncontradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEncontradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEncontradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
