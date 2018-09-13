import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiperMenu } from './hipermenu.component';

describe('HiperMenu', () => {
  let component: HiperMenu;
  let fixture: ComponentFixture<HiperMenu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiperMenu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiperMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
