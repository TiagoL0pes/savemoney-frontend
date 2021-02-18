import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharItemComponent } from './detalhar-item.component';

describe('DetalharItemComponent', () => {
  let component: DetalharItemComponent;
  let fixture: ComponentFixture<DetalharItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalharItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalharItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
