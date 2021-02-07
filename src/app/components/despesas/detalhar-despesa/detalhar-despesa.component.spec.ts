import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharDespesaComponent } from './detalhar-despesa.component';

describe('DetalharDespesaComponent', () => {
  let component: DetalharDespesaComponent;
  let fixture: ComponentFixture<DetalharDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalharDespesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalharDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
