import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasModificarComponent } from './mascotas-modificar.component';

describe('MascotasModificarComponent', () => {
  let component: MascotasModificarComponent;
  let fixture: ComponentFixture<MascotasModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
