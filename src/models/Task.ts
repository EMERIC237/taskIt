export enum Priority {
  low,
  medium,
  high,
}

export enum Status {
  todo,
  inProgress,
  done,
}
export class Task {
  static id = 0;
  public taskId: number;
  constructor(
    public title: string,
    public dueDate: Date,
    public priority: Priority,
    public status: Status,
  ) {
    this.taskId = Task.id++;
  }



}
