import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Priority, Status, Task } from 'src/models/Task';
import { TaskStoreService } from '../task-store.service';
import { MatDialog } from '@angular/material/dialog';
import { FormTaskDialogComponent } from '../form-task-dialog/form-task-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  allTasks: Task[] = [];
  displayedColumns: string[] = [
    'taskId',
    'title',
    'dueDate',
    'priority',
    'status',
    'actions',
  ];

  priorities = Object.values(Priority);
  statuses = Object.values(Status);
  selectedStatus: string = '';
  selectedPriority: string = '';
  selectedDate: string = '';
  uniqueDates: Date[] = [];
  private taskSubscription = new Subscription();
  @Output() openModalEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private taskStore: TaskStoreService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskSubscription.add(
      this.taskStore.tasksChange$.subscribe((tasks) => {
        this.allTasks = tasks;
        this.tasks = [...this.allTasks];
      })
    );
    this.uniqueDates = this.getUniqueDates();
  }

  loadTasks(): void {
    this.allTasks = this.taskStore.getAllTasks();
    this.tasks = [...this.allTasks];
  }

  onAddNewTask() {
    const dialogRef = this.dialog.open(FormTaskDialogComponent, {
      data: { selectedTask: null },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        this.addNewTask(task);
      }
    });
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
      return (
        this.statusMatches(task) &&
        this.priorityMatches(task) &&
        this.dateMatches(task)
      );
    });
  }

  statusMatches(task: Task): boolean {
    return this.selectedStatus ? task.status === this.selectedStatus : true;
  }

  priorityMatches(task: Task): boolean {
    return this.selectedPriority
      ? task.priority === this.selectedPriority
      : true;
  }

  dateMatches(task: Task): boolean {
    if (this.selectedDate) {
      const selectedDateObj = new Date(this.selectedDate);
      return task.dueDate.toDateString() === selectedDateObj.toDateString();
    }
    return true;
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
  }
}
