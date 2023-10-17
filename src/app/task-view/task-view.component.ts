import { Component } from '@angular/core';
import { TaskStoreService } from '../task-store.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent {
  isOpen = false;

  constructor(private taskStore: TaskStoreService) {}
  showModalView(taskId: number) {
    const currTask = this.taskStore.getTaskById(taskId);
    console.log('this is the modal to be showed: ', currTask);
  }
  closeModal() {
    this.isOpen = false;
  }
}
