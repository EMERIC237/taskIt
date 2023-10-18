import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskStoreService } from '../task-store.service';
import { Status, Task } from 'src/models/Task';
import { Subscription } from 'rxjs';
import { filterTaskByStatus } from 'src/utilities/helpers';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  allTasks: Task[] = [];
  toDoTasks: Task[] = [];
  InProgressTask: Task[] = [];
  DoneTasks: Task[] = [];
  private subscription = new Subscription();

  constructor(private taskStore: TaskStoreService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.taskStore.tasksChange$.subscribe((tasks) => {
        this.allTasks = tasks;
        this.toDoTasks = filterTaskByStatus(tasks, Status.Todo);
        this.InProgressTask = filterTaskByStatus(tasks, Status.InProgress);
        this.DoneTasks = filterTaskByStatus(tasks, Status.Done);
      })
    );
  }

  loadTasks(): void {
    this.allTasks = this.taskStore.getAllTasks();
  }

  isTodo(task: Task): boolean {
    return task.status === Status.Todo;
  }

  isInProgress(task: Task): boolean {
    return task.status === Status.InProgress;
  }

  isDone(task: Task): boolean {
    return task.status === Status.Done;
  }

  onStatusChange(taskId: number, newStatus: Status) {
    this.taskStore.updateTaskStatus(taskId, newStatus);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
