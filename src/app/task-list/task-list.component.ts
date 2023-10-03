import { Component, EventEmitter, Output } from '@angular/core';
import { Priority, Status, Task } from 'src/models/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  tasks: Task[] = [
    new Task(
      'Create a new project',
      new Date('2020-01-01'),
      Priority.high,
      Status.todo
    ),
    new Task(
      'Create a new component',
      new Date('2020-01-01'),
      Priority.medium,
      Status.inProgress
    ),
    new Task(
      'Create a new service',
      new Date('2020-01-01'),
      Priority.low,
      Status.done
    ),
  ];

  @Output() openModalEvent: EventEmitter<void> = new EventEmitter<void>();

  onAddNewTask() {
    this.openModalEvent.emit();
  }

  addNewTask(Task: Task) {
    this.tasks.push(Task);
  }

  onViewTask(taskId: number) {}

  onEditTask(taskId: number) {}

  onDeleteTask(taskId: number) {}
}
