import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPaginatorComponent } from './month-paginator.component';

describe('MonthPaginatorComponent', () => {
  let component: MonthPaginatorComponent;
  let fixture: ComponentFixture<MonthPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
