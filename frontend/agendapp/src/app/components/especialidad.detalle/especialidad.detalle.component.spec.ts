import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadDetalleComponent } from './especialidad.detalle.component';

describe('EspecialidadDetalleComponent', () => {
  let component: EspecialidadDetalleComponent;
  let fixture: ComponentFixture<EspecialidadDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialidadDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspecialidadDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
