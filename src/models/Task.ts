export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum Status {
  Todo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

export class Task {
  static id = 0;
  public taskId: number;

  constructor(
    public title: string,
    public dueDate: Date,
    public priority: Priority,
    public status: Status
  ) {
    this.taskId = Task.id++;
  }
}
