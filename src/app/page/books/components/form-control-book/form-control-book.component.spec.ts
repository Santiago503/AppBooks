import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlBookComponent } from './form-control-book.component';

describe('FormControlBookComponent', () => {
  let component: FormControlBookComponent;
  let fixture: ComponentFixture<FormControlBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormControlBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
