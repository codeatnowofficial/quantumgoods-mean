import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesmainComponent } from './subcategoriesmain.component';

describe('SubcategoriesmainComponent', () => {
  let component: SubcategoriesmainComponent;
  let fixture: ComponentFixture<SubcategoriesmainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoriesmainComponent]
    });
    fixture = TestBed.createComponent(SubcategoriesmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
