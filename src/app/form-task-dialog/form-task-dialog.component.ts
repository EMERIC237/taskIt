import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/models/Task';

@Component({
  selector: 'app-form-task-dialog',
  templateUrl: './form-task-dialog.component.html',
  styleUrls: ['./form-task-dialog.component.scss'],
})
export class FormTaskDialogComponent {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedTask: Task | null },
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      taskTitle: ['', Validators.required],
      dueDate: [new Date(), Validators.required],
      taskPriority: ['', Validators.required],
      taskStatus: ['', Validators.required],
    });

    if (this.data.selectedTask) {
      this.formGroup.patchValue(this.data.selectedTask);
    }
  }

  submitForm(): void {
    if (this.formGroup.valid) {
      const {
        taskTitle: title,
        dueDate,
        taskPriority: priority,
        taskStatus: status,
      } = this.formGroup.value;

      const task = new Task(title, new Date(dueDate), priority, status);

      this.dialogRef.close(task);
    }
  }
}
