import { Task, Status, Priority } from './Task';

export class TaskStore {
  private tasks: Task[] = [];

  // Add a task to the store
  addTask(task: Task) {
    this.tasks.push(task);
  }

  // Get all tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Get unique statuses from all tasks
  getAllUniqueStatuses(): Status[] {
    const uniqueStatuses = new Set(this.tasks.map((task) => task.status));
    return [...uniqueStatuses];
  }

  // Get unique due dates from all tasks
  getAllUniqueDates(): Date[] {
    const uniqueDates = new Set(
      this.tasks.map((task) => task.dueDate.toISOString().split('T')[0])
    );
    return [...uniqueDates].map((dateString) => new Date(dateString));
  }

  // Get unique priorities from all tasks
  getAllUniquePriorities(): Priority[] {
    const uniquePriorities = new Set(this.tasks.map((task) => task.priority));
    return [...uniquePriorities];
  }
}
