import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistasAsignarComponent } from './especialistas-asignar.component';

describe('EspecialistasAsignarComponent', () => {
  let component: EspecialistasAsignarComponent;
  let fixture: ComponentFixture<EspecialistasAsignarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialistasAsignarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistasAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
