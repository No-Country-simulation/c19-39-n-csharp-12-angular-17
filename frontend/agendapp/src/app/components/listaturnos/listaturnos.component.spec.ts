import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaturnosComponent } from './listaturnos.component';

describe('ListaturnosComponent', () => {
  let component: ListaturnosComponent;
  let fixture: ComponentFixture<ListaturnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaturnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
