import { Component, OnInit } from '@angular/core';
import { TaskStoreService } from '../task-store.service';
import { Status, Task } from 'src/models/Task';
import { STRING_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit {
  allTasks: Task[] = [];
  toDoTasks: Task[] = [];
  InProgressTask: Task[] = [];
  DoneTasks: Task[] = [];

  constructor(private taskStoreService: TaskStoreService) {}

  ngOnInit(): void {
    this.allTasks = this.taskStoreService.getAllTasks();
    this.toDoTasks = this.taskStoreService.getTasksByStatus(Status.Todo);
    this.InProgressTask = this.taskStoreService.getTasksByStatus(
      Status.InProgress
    );
    this.DoneTasks = this.taskStoreService.getTasksByStatus(Status.Done);
  }

}
