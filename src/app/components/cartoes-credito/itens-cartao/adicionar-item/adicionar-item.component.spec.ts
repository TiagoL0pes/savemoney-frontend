import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarItemComponent } from './adicionar-item.component';

describe('AdicionarItemComponent', () => {
  let component: AdicionarItemComponent;
  let fixture: ComponentFixture<AdicionarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
