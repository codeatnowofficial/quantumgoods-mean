import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryRouterComponent } from './catagory-router.component';

describe('CatagoryRouterComponent', () => {
  let component: CatagoryRouterComponent;
  let fixture: ComponentFixture<CatagoryRouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatagoryRouterComponent]
    });
    fixture = TestBed.createComponent(CatagoryRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
