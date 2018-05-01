import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenosConsultarComponent } from './duenos-consultar.component';

describe('DuenosConsultarComponent', () => {
  let component: DuenosConsultarComponent;
  let fixture: ComponentFixture<DuenosConsultarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuenosConsultarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuenosConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
