import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoComponent } from './turno.component';

describe('TurnoComponent', () => {
  let component: TurnoComponent;
  let fixture: ComponentFixture<TurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
