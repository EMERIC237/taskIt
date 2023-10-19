import { Task, Priority, Status } from 'src/models/Task';
export const mockTasks: Task[] = [
  new Task(
    'Finish Angular project',
    new Date('2023-12-01'),
    Priority.High,
    Status.Todo
  ),
  new Task(
    'Send email to manager',
    new Date('2023-10-05'),
    Priority.Medium,
    Status.InProgress
  ),
  new Task(
    'Design new UI layout',
    new Date('2023-10-20'),
    Priority.Low,
    Status.Done
  ),
];
