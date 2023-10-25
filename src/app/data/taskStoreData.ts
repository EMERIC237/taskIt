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
    "Review team's code submissions",
    new Date('2023-11-05'),
    Priority.High,
    Status.InProgress
  ),
  new Task(
    'Attend project planning meeting',
    new Date('2023-10-10'),
    Priority.Medium,
    Status.Todo
  ),
  new Task(
    'Update project documentation',
    new Date('2023-11-15'),
    Priority.Low,
    Status.Todo
  ),
  new Task(
    'Research latest UX trends',
    new Date('2023-10-25'),
    Priority.Medium,
    Status.Todo
  ),
  new Task(
    'Optimize database queries',
    new Date('2023-11-10'),
    Priority.High,
    Status.InProgress
  ),
  new Task(
    'Backup all project data',
    new Date('2023-10-28'),
    Priority.Low,
    Status.Done
  ),
  new Task(
    'Conduct user testing session',
    new Date('2023-11-20'),
    Priority.Medium,
    Status.Todo
  ),
];
