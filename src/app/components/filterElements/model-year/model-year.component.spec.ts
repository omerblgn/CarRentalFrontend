import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelYearComponent } from './model-year.component';

describe('ModelYearComponent', () => {
  let component: ModelYearComponent;
  let fixture: ComponentFixture<ModelYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
