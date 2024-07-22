import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxadminComponent } from './inboxadmin.component';

describe('InboxadminComponent', () => {
  let component: InboxadminComponent;
  let fixture: ComponentFixture<InboxadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboxadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InboxadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
