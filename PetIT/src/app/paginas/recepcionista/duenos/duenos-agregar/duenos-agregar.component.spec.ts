import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenosAgregarComponent } from './duenos-agregar.component';

describe('DuenosAgregarComponent', () => {
  let component: DuenosAgregarComponent;
  let fixture: ComponentFixture<DuenosAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuenosAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuenosAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
