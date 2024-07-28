import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerdetalleusuarioComponent } from './modal-verdetalleusuario.component';

describe('ModalVerdetalleusuarioComponent', () => {
  let component: ModalVerdetalleusuarioComponent;
  let fixture: ComponentFixture<ModalVerdetalleusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVerdetalleusuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalVerdetalleusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
