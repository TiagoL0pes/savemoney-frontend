import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelaDialogComponent } from './parcela-dialog.component';

describe('ParcelaDialogComponent', () => {
  let component: ParcelaDialogComponent;
  let fixture: ComponentFixture<ParcelaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
