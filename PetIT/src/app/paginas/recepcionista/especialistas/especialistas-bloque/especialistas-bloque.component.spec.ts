import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistasBloqueComponent } from './especialistas-bloque.component';

describe('EspecialistasBloqueComponent', () => {
  let component: EspecialistasBloqueComponent;
  let fixture: ComponentFixture<EspecialistasBloqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialistasBloqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistasBloqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
