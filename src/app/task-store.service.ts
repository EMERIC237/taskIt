import { Injectable } from '@angular/core';
import { Priority, Status, Task } from 'src/models/Task';
import {
  BehaviorSubject,
  exhaustMap,
  take,
  tap,
  switchMap,
  Observable,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
interface taskApi {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  firebaseRootURL = 'https://taskit-9cbdc-default-rtdb.firebaseio.com';

  private tasks: Task[] = [];
  private tasksChangeSubject: BehaviorSubject<Task[]> = new BehaviorSubject<
    Task[]
  >(this.tasks);

  constructor(private http: HttpClient) {
    this.fetchTasksFromFirebase();
  }
  private fetchTasksFromFirebase(): void {
    this.http.get<Task[]>(this.firebaseRootURL + '/task.json').subscribe({
      next: (res) => {
        for (const taskKey in res) {
          const currTask = res[taskKey];
          currTask.taskId = taskKey;
          this.tasks.push(res[taskKey]);
        }
        this.tasksChangeSubject.next(this.tasks);
      },
      error: (err) => console.error('Error fetching tasks', err),
    });
  }

  private updateTasks(response: { [key: string]: Task }): void {
    this.tasks = Object.entries(response).map(([taskId, task]) => ({
      ...task,
      taskId,
    }));
    this.tasksChangeSubject.next(this.tasks);
  }

  get tasksChange$(): Observable<Task[]> {
    return this.tasksChangeSubject.asObservable();
  }

  addTask(task: Task): void {
    this.http
      .post<{ name: string }>(`${this.firebaseRootURL}/task.json`, task)
      .subscribe({
        next: (res) => {
          task.taskId = res.name;
          this.tasks.push(task);
          this.tasksChangeSubject.next(this.tasks);
        },
        error: (err) => console.error('Error adding task', err),
      });
  }

  updateTask(updatedTask: Task): void {
    this.http
      .put<Task>(
        `${this.firebaseRootURL}/task/${updatedTask.taskId}.json`,
        updatedTask
      )
      .subscribe({
        next: (res) => {
          const index = this.tasks.findIndex(
            (task) => task.taskId === updatedTask.taskId
          );
          if (index !== -1) {
            this.tasks[index] = res;
            this.tasksChangeSubject.next(this.tasks);
          }
        },
        error: (err) => console.error('Error updating the task', err),
      });
  }

  deleteTask(taskId: string): void {
    this.http.delete(`${this.firebaseRootURL}/task/${taskId}.json`).subscribe({
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

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.taskId === id);
  }

  updateTaskStatus(taskId: string, newStatus: Status): void {
    const task = this.getTaskById(taskId);
    if (task) {
      task.status = newStatus;
      this.updateTask(task);
    }
  }

  updateTaskPriority(taskId: string, newPriority: Priority): void {
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
