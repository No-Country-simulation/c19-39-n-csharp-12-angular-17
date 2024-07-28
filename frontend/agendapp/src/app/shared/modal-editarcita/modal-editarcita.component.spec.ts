import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarcitaComponent } from './modal-editarcita.component';

describe('ModalEditarcitaComponent', () => {
  let component: ModalEditarcitaComponent;
  let fixture: ComponentFixture<ModalEditarcitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarcitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarcitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
