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
import { FormTaskDialogComponent } from '../components/form-task-dialog/form-task-dialog.component';
import { WarningDialogComponent } from '../components/warning-dialog/warning-dialog.component';
import { Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ViewTaskDialogComponent } from '../components/view-task-dialog/view-task-dialog.component';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
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
  private taskSub!: Subscription;
  @Output() openModalEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private taskStore: TaskStoreService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskSub = this.taskStore.tasksChange$.subscribe((tasks) => {
      this.allTasks = tasks;
      if (this.allTasks != null) this.tasks = [...this.allTasks];
    });
    this.uniqueDates = this.getUniqueDates();

  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className],
    });
  }
  onAddNewTask() {
    const dialogRef = this.dialog.open(FormTaskDialogComponent, {
      data: null,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        this.addNewTask(task);
        this.openSnackBar('Task added successfully', 'Close', 'green-snackbar');
      }
    });
  }

  addNewTask(task: Task) {
    this.taskStore.addTask(task);
  }

  updateTask(toUpdateTask: Task) {
    this.taskStore.updateTask(toUpdateTask);
  }
  onViewTask(taskId: string) {
    const dialogRef = this.dialog.open(ViewTaskDialogComponent, {
      data: this.taskStore.getTaskById(taskId),
    });
  }

  onEditTask(taskId: string) {
    const dialogRef = this.dialog.open(FormTaskDialogComponent, {
      data: this.taskStore.getTaskById(taskId),
    });
    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        this.updateTask(task);
        this.openSnackBar('Task edited successfully', 'Close', 'blue-snackbar');
      }
    });
  }

  onDeleteTask(taskId: string): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: this.taskStore.getTaskById(taskId),
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((confirmDel: boolean) => {
      if (confirmDel) {
        this.taskStore.deleteTask(taskId);
        this.openSnackBar('Task deleted successfully', 'Close', 'red-snackbar');
      }
    });
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
    this.taskSub.unsubscribe();
  }
}
