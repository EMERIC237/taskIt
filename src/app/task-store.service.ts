import { EventEmitter, Injectable } from '@angular/core';
import { Priority, Status, Task } from 'src/models/Task';
import { mockTasks } from './data/taskStoreData';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  firebaseRootURL = '/api';
  private tasks: Task[] = [...mockTasks];
  private tasksChangeSubject: BehaviorSubject<Task[]> = new BehaviorSubject<
    Task[]
  >(this.tasks);

  constructor(private http: HttpClient) {
    this.fetchTasksFromFirebase();
  }

  private fetchTasksFromFirebase(): void {
    this.http.get<Task[]>(this.firebaseRootURL).subscribe({
      next: (res) => {
        this.tasks = res;
        this.tasksChangeSubject.next(this.tasks);
      },
      error: (err) => console.error('Error fetching tasks', err),
    });
  }

  get tasksChange$() {
    return this.tasksChangeSubject.asObservable();
  }

  addTask(task: Task): void {
    this.http.post<Task>(`${this.firebaseRootURL}`, task).subscribe({
      next: (res) => {
        this.tasks.push(res); // Push the returned task, which includes the unique identifier from Firebase
        this.tasksChangeSubject.next(this.tasks);
      },
      error: (err) => console.error('Error adding task', err),
    });
  }

  updateTask(updatedTask: Task): void {
    this.http
      .put<Task>(`${this.firebaseRootURL}/${updatedTask.taskId}`, updatedTask)
      .subscribe({
        next: (res) => {
          const index = this.tasks.findIndex(
            (task) => task.taskId === updatedTask.taskId
          );
          if (index !== -1) {
            this.tasks[index] = res; // Update the task with the returned updated task
            this.tasksChangeSubject.next(this.tasks);
          }
        },
        error: (err) => console.error('Error updating the task', err),
      });
  }

  deleteTask(taskId: number): void {
    this.http.delete(`${this.firebaseRootURL}/${taskId}`).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.taskId !== taskId);
        this.tasksChangeSubject.next(this.tasks);
      },
      error: (err) => console.error('Error deleting task', err),
    });
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.taskId === id);
  }

  updateTaskStatus(taskId: number, newStatus: Status): void {
    const task = this.getTaskById(taskId);
    if (task) {
      task.status = newStatus;
      this.updateTask(task);
    }
  }

  updateTaskPriority(taskId: number, newPriority: Priority): void {
    const task = this.getTaskById(taskId);
    if (task) {
      task.priority = newPriority;
      this.updateTask(task);
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
