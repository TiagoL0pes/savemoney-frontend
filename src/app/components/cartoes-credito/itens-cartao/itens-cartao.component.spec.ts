import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensCartaoComponent } from './itens-cartao.component';

describe('ItensCartaoComponent', () => {
  let component: ItensCartaoComponent;
  let fixture: ComponentFixture<ItensCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
