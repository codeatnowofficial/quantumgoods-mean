import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesrouterComponent } from './subcategoriesrouter.component';

describe('SubcategoriesrouterComponent', () => {
  let component: SubcategoriesrouterComponent;
  let fixture: ComponentFixture<SubcategoriesrouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoriesrouterComponent]
    });
    fixture = TestBed.createComponent(SubcategoriesrouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
