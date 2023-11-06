import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Priority, Status, Task } from 'src/models/Task';
import { TaskStoreService } from '../task-store.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent {
  task: Task;

  constructor(private taskStore: TaskStoreService, private dialog: MatDialog) {
    this.task = new Task(
      'test',
      new Date(),
      Priority.High,
      Status.Done,
      'test2'
    );
  }

  showModalView(taskId: number): void {
    const currTask = this.taskStore.getTaskById(taskId);
    this.task = currTask!;
    if (currTask) {
      // const dialogRef = this.dialog.open(TaskModalComponent, {
      //   width: '400px', // you can adjust the size as needed
      //   data: { task: currTask }
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   // You can handle any returned data or actions here if needed
      // });
    }
  }
}
