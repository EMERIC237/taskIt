import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status, Task } from 'src/models/Task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  statuses = Object.values(Status);
  @Output() statusChanged: EventEmitter<Status> = new EventEmitter<Status>();

  onStatusChange(newStatus: Status): void {
    this.statusChanged.emit(newStatus);
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case 'High':
        return 'arrow_upward';
      case 'Medium':
        return 'remove';
      case 'Low':
        return 'arrow_downward';
      default:
        return '';
    }
  }
}
