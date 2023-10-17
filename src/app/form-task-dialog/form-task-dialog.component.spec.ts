import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaskDialogComponent } from './form-task-dialog.component';

describe('FormTaskDialogComponent', () => {
  let component: FormTaskDialogComponent;
  let fixture: ComponentFixture<FormTaskDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTaskDialogComponent]
    });
    fixture = TestBed.createComponent(FormTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
