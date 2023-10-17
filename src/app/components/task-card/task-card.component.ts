import { Component, Input } from '@angular/core';
import { Status, Task } from 'src/models/Task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  statuses = Object.values(Status);
}
