import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenosModificarComponent } from './duenos-modificar.component';

describe('DuenosModificarComponent', () => {
  let component: DuenosModificarComponent;
  let fixture: ComponentFixture<DuenosModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuenosModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuenosModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
