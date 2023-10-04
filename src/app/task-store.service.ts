import { Injectable } from '@angular/core';
import { Priority, Status, Task } from 'src/models/Task';
import { mockTasks } from './data/taskStoreData';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  private tasks: Task[] = [...mockTasks];

  constructor() {}

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.taskId === id);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(
      (task) => task.taskId === updatedTask.taskId
    );
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(taskId: number): void {
    const index = this.tasks.findIndex((task) => task.taskId === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  getAllUniqueStatuses(): Status[] {
    const uniqueStatuses = new Set(this.tasks.map((task) => task.status));
    return [...uniqueStatuses];
  }

  getAllUniqueDates(): Date[] {
    const uniqueDates = new Set(
      this.tasks.map((task) => task.dueDate.toISOString().split('T')[0])
    );
    return [...uniqueDates].map((dateString) => new Date(dateString));
  }

  getAllUniquePriorities(): Priority[] {
    const uniquePriorities = new Set(this.tasks.map((task) => task.priority));
    return [...uniquePriorities];
  }

  getTasksByStatus(status: Status): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  getTasksByDate(date: Date): Task[] {
    date = new Date(date);

    const filteredTasks = this.tasks.filter((task) => {
      console.log('Task Date:', task.dueDate.toISOString().split('T')[0]);
      return (
        task.dueDate.toISOString().split('T')[0] ===
        date.toISOString().split('T')[0]
      );
    });
    return filteredTasks;
  }

  getTasksByPriority(priority: Priority): Task[] {
    return this.tasks.filter((task) => task.priority === priority);
  }
}
