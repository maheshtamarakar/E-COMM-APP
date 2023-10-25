import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothCategoriesComponent } from './cloth-categories.component';

describe('ClothCategoriesComponent', () => {
  let component: ClothCategoriesComponent;
  let fixture: ComponentFixture<ClothCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
