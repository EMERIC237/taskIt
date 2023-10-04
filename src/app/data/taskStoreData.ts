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
  new Task(
    'Update app dependencies',
    new Date('2023-11-15'),
    Priority.High,
    Status.Todo
  ),
  new Task(
    'Attend team meeting',
    new Date('2023-10-05'),
    Priority.Medium,
    Status.InProgress
  ),
  new Task(
    'Review codebase',
    new Date('2023-10-20'),
    Priority.Low,
    Status.Done
  ),
  new Task(
    'Refactor service logic',
    new Date('2023-11-01'),
    Priority.High,
    Status.Todo
  ),
  new Task(
    'Update documentation',
    new Date('2023-10-05'),
    Priority.Medium,
    Status.InProgress
  ),
  new Task(
    'Update unit tests',
    new Date('2023-10-20'),
    Priority.Low,
    Status.Done
  ),
  new Task(
    'Update integration tests',
    new Date('2023-11-15'),
    Priority.High,
    Status.Todo
  ),
  new Task(
    'Update end-to-end tests',
    new Date('2023-10-05'),
    Priority.Medium,
    Status.InProgress
  ),
  new Task(
    'Update UI tests',
    new Date('2023-10-20'),
    Priority.Low,
    Status.Done
  ),
  new Task(
    'Update component tests',
    new Date('2023-11-01'),
    Priority.High,
    Status.Todo
  ),
];
