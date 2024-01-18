import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersIndividualPageComponent } from './users-individual-page.component';

describe('UsersIndividualPageComponent', () => {
  let component: UsersIndividualPageComponent;
  let fixture: ComponentFixture<UsersIndividualPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersIndividualPageComponent]
    });
    fixture = TestBed.createComponent(UsersIndividualPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
