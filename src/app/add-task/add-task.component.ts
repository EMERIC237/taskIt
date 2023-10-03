import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task, Priority, Status } from 'src/models/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  isOpen = false;

  @ViewChild('addTaskForm') addTaskForm!: NgForm;
  @Output() addNewTaskEvent: EventEmitter<Task> = new EventEmitter<Task>();

  openModal() {
    this.isOpen = true;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.isOpen = false;
    document.body.classList.remove('modal-open');
  }

  onFormSubmit() {
    const {
      taskTitle: title,
      dueDate,
      taskPriority: priority,
      taskStatus: status,
    } = this.addTaskForm.value;
    const newTask = new Task(title, new Date(dueDate), priority, status);
    this.addNewTaskEvent.emit(newTask);
    this.closeModal();
  }
}
