import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnodetalleComponent } from './turnodetalle.component';

describe('TurnodetalleComponent', () => {
  let component: TurnodetalleComponent;
  let fixture: ComponentFixture<TurnodetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnodetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
