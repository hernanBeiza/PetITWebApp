import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasListarComponent } from './horas-listar.component';

describe('HorasListarComponent', () => {
  let component: HorasListarComponent;
  let fixture: ComponentFixture<HorasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
