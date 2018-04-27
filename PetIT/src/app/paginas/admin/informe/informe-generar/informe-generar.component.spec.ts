import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeGenerarComponent } from './informe-generar.component';

describe('InformeGenerarComponent', () => {
  let component: InformeGenerarComponent;
  let fixture: ComponentFixture<InformeGenerarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeGenerarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeGenerarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
