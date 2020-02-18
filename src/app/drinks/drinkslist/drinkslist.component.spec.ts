import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkslistComponent } from './drinkslist.component';

describe('DrinkslistComponent', () => {
  let component: DrinkslistComponent;
  let fixture: ComponentFixture<DrinkslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
