import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarusuariologueadoComponent } from './navbarusuariologueado.component';

describe('NavbarusuariologueadoComponent', () => {
  let component: NavbarusuariologueadoComponent;
  let fixture: ComponentFixture<NavbarusuariologueadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarusuariologueadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarusuariologueadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
