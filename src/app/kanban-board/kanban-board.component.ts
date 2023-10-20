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
  private taskSubs!: Subscription;

  constructor(private taskStore: TaskStoreService) {}

  ngOnInit(): void {
    this.taskSubs = this.taskStore.tasksChange$.subscribe((tasks) => {
      this.allTasks = tasks;
      this.toDoTasks = filterTaskByStatus(tasks, Status.Todo);
      this.InProgressTask = filterTaskByStatus(tasks, Status.InProgress);
      this.DoneTasks = filterTaskByStatus(tasks, Status.Done);
      console.log('todo: ', this.toDoTasks);
      console.log('In progress: ', this.InProgressTask);
      console.log('Done: ', this.DoneTasks);
    });
  }

  onStatusChange(taskId: number, newStatus: Status) {
    this.taskStore.updateTaskStatus(taskId, newStatus);
  }

  ngOnDestroy(): void {
    this.taskSubs.unsubscribe();
  }
}
