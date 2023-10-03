import { Component, ViewChild } from '@angular/core';
import { AddTaskComponent } from './add-task/add-task.component';
import { Task } from 'src/models/Task';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'taskIt';

  @ViewChild(AddTaskComponent) addTaskComponent!: AddTaskComponent;
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  openAddTaskModal() {
    this.addTaskComponent.openModal();
  }

  createNewTask(task: Task) {
    this.taskListComponent.addNewTask(task);
  }
}
