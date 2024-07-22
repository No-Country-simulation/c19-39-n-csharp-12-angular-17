import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarusuarioComponent } from './modal-editarusuario.component';

describe('ModalEditarusuarioComponent', () => {
  let component: ModalEditarusuarioComponent;
  let fixture: ComponentFixture<ModalEditarusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
