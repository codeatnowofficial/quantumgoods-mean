import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductPageComponent } from './addproduct-page.component';

describe('AddproductPageComponent', () => {
  let component: AddproductPageComponent;
  let fixture: ComponentFixture<AddproductPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddproductPageComponent]
    });
    fixture = TestBed.createComponent(AddproductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
