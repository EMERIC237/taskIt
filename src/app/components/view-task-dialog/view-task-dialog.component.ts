import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/Task';

@Component({
  selector: 'app-view-task-dialog',
  templateUrl: './view-task-dialog.component.html',
  styleUrls: ['./view-task-dialog.component.scss'],
})
export class ViewTaskDialogComponent {
  task: Task;
  constructor(
    public dialogRef: MatDialogRef<ViewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) incomingTask: Task
  ) {
    this.task = incomingTask;
  }
}
