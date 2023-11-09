import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskStoreService } from '../task-store.service';
import { Status, Task } from 'src/models/Task';
import { Subscription } from 'rxjs';
import { filterTaskByStatus } from 'src/utilities/helpers';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  allTasks: Task[] = [];
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  private taskSubs!: Subscription;

  constructor(private taskStore: TaskStoreService) {}

  ngOnInit(): void {
    this.taskSubs = this.taskStore.tasksChange$.subscribe((tasks) => {
      this.allTasks = tasks;
      this.toDoTasks = filterTaskByStatus(tasks, Status.Todo);
      this.inProgressTasks = filterTaskByStatus(tasks, Status.InProgress);
      this.doneTasks = filterTaskByStatus(tasks, Status.Done);
    });
  }

  onStatusChange(taskId: string, newStatus: Status) {
    this.taskStore.updateTaskStatus(taskId, newStatus);
  }

  ngOnDestroy(): void {
    this.taskSubs.unsubscribe();
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    // Determine the new status based on the target list
    let newStatus: Status = Status.Todo;

    const movedTask = event.item.data as Task;

    if (event.container.id === 'toDoList') {
      newStatus = Status.Todo;
    } else if (event.container.id === 'inProgressList') {
      newStatus = Status.InProgress;
    } else if (event.container.id === 'doneList') {
      newStatus = Status.Done;
    }

    // Update the status of the moved task
    this.onStatusChange(movedTask.taskId!, newStatus);
  }
}
