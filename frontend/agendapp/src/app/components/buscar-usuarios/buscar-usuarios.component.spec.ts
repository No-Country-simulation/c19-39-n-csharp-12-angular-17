import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarUsuariosComponent } from './buscar-usuarios.component';

describe('BuscarUsuariosComponent', () => {
  let component: BuscarUsuariosComponent;
  let fixture: ComponentFixture<BuscarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
