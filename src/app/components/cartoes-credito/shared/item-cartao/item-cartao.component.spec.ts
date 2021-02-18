import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCartaoComponent } from './item-cartao.component';

describe('ItemCartaoComponent', () => {
  let component: ItemCartaoComponent;
  let fixture: ComponentFixture<ItemCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
