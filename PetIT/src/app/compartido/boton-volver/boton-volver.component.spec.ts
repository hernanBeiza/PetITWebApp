import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonVolver } from './boton-volver.component';

describe('BotonVolver', () => {
  let component: BotonVolver;
  let fixture: ComponentFixture<BotonVolver>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonVolver ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonVolver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
