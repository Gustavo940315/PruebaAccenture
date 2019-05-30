import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoPage } from './prestamo.page';

describe('PrestamoPage', () => {
  let component: PrestamoPage;
  let fixture: ComponentFixture<PrestamoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 /* it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('validar fecha superior a la actual', () => {
    component.fechaLaboral=new Date(2020,2,23);
    expect(component.validarFechaIngreso).toEqual(false)
  });
  it('validar fecha menor a la actual', () => {
    component.fechaLaboral=new Date(2000,2,23);
    expect(component.validarFechaIngreso).toEqual(true)
  });
  it('cumple años laborales', () => {
    component.fechaLaboral=new Date(2000,2,23);
    expect(component.validarDias).toEqual(true)
  });
  it('no cumple años laborales', () => {
    component.fechaLaboral=new Date(2019,2,23);
    expect(component.validarDias).toEqual(false)
  });
  it('aprobacion credito', () => {
    component.fechaLaboral=new Date(2000,2,23);
    component.salario=4000000;
    expect(component.validarCredito())
  });
});
