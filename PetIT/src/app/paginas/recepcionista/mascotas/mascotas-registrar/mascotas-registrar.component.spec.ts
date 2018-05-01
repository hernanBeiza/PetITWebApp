import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasRegistrarComponent } from './mascotas-registrar.component';

describe('MascotasRegistrarComponent', () => {
  let component: MascotasRegistrarComponent;
  let fixture: ComponentFixture<MascotasRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
