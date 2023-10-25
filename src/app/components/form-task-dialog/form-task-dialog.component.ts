import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority, Status, Task } from 'src/models/Task';

@Component({
  selector: 'app-form-task-dialog',
  templateUrl: './form-task-dialog.component.html',
  styleUrls: ['./form-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTaskDialogComponent {
  formGroup!: FormGroup;
  isLoading: boolean = false;
  priorities = Object.values(Priority);
  statuses = Object.values(Status);

  constructor(
    public dialogRef: MatDialogRef<FormTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task | null,
    private fb: FormBuilder
  ) {
    this.initializeForm();
    if (this.task) {
      this.setFormValues(this.task);
    }
  }
  private initializeForm(): void {
    this.formGroup = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      dueDate: [new Date(), Validators.required],
      taskPriority: ['', Validators.required],
      taskStatus: ['', Validators.required],
    });
  }

  private setFormValues(task: Task): void {
    this.formGroup.patchValue({
      taskTitle: task.title,
      dueDate: task.dueDate,
      taskPriority: task.priority,
      taskDescription: task.description,
      taskStatus: task.status,
    });
  }

  submitForm(): void {
    if (this.formGroup.valid) {
      const {
        taskTitle: title,
        dueDate,
        taskPriority: priority,
        taskDescription: description,
        taskStatus: status,
      } = this.formGroup.value;

      const task = new Task(
        title,
        new Date(dueDate),
        priority,
        status,
        description,
        this.task?.taskId
      );

      this.isLoading = true; // for spinner (simulate a delay, e.g., when saving to a server)
      setTimeout(() => {
        this.isLoading = false;
        this.dialogRef.close(task);
      }, 1000);
    }
  }
}
