import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoriaComponent } from './modal-categoria.component';

describe('ModalCategoriaComponent', () => {
  let component: ModalCategoriaComponent;
  let fixture: ComponentFixture<ModalCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
