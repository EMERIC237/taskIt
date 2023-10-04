import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Priority, Status, Task } from 'src/models/Task';
import { TaskStoreService } from '../task-store.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  allTasks: Task[] = [];
  priorities = Object.values(Priority);
  statuses = Object.values(Status);
  selectedStatus: string = '';
  selectedPriority: string = '';
  selectedDate: string = '';
  @Output() openModalEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private taskStore: TaskStoreService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.allTasks = this.taskStore.getAllTasks();
    this.tasks = [...this.allTasks];
  }

  onAddNewTask() {
    this.openModalEvent.emit();
  }

  addNewTask(task: Task) {
    this.taskStore.addTask(task);
    this.loadTasks();
  }

  onViewTask(taskId: number) {}

  onEditTask(taskId: number) {}

  onDeleteTask(taskId: number): void {
    this.taskStore.deleteTask(taskId);
    this.loadTasks();
  }

  getUniqueDates(): Date[] {
    return this.taskStore.getAllUniqueDates();
  }

  filterTasks() {
    this.tasks = this.allTasks.filter((task) => {
      let statusMatch = true,
        priorityMatch = true,
        dateMatch = true;

      if (this.selectedStatus) {
        statusMatch = task.status === this.selectedStatus;
      }

      if (this.selectedPriority) {
        priorityMatch = task.priority === this.selectedPriority;
      }

      if (this.selectedDate) {
        const selectedDateObj = new Date(this.selectedDate);
        dateMatch =
          task.dueDate.toISOString().split('T')[0] ===
          selectedDateObj.toISOString().split('T')[0];
      }

      return statusMatch && priorityMatch && dateMatch;
    });
  }
}
