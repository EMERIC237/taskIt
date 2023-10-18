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
  }
  closeModal() {
    this.isOpen = false;
  }
}
