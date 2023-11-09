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
  static id = 1;

  constructor(
    public title: string,
    public dueDate: Date,
    public priority: Priority,
    public status: Status,
    public description?: string,
    public taskId?: string
  ) {}
}
