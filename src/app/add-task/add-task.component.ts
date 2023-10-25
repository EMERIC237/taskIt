import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Task, Priority, Status } from 'src/models/Task';
import { FormTaskDialogComponent } from '../components/form-task-dialog/form-task-dialog.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  isOpen = false;

  @ViewChild('addTaskForm') addTaskForm!: NgForm;
  @Output() addNewTaskEvent: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() selectedTask: Task | null = null;

  constructor(public dialog: MatDialog) {}

  openModal() {
    const dialogRef = this.dialog.open(FormTaskDialogComponent, {
      data: { selectedTask: this.selectedTask },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addNewTaskEvent.emit(result);
        this.selectedTask = null;
      }
    });
  }


}
