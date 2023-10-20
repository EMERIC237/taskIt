import { Priority, Status, Task } from 'src/models/Task';

interface FilterOptions {
  status?: Status;
  priority?: Priority;
  date?: Date;
}

export function filterTaskByStatus(tasks: Task[], status: Status) {
  console.log('filter func tasks ', tasks);
  const filteredTasks = tasks.filter((task) => task.status == status);
  console.log('filter func filtered ', filteredTasks);
  return filteredTasks;
}

export function filterTaskByPriority(tasks: Task[], priority: Priority) {
  return tasks.filter((task) => task.priority === priority);
}

export function filterTaskByDate(tasks: Task[], date: Date) {
  return tasks.filter(
    (task) => task.dueDate.toDateString() === date.toDateString()
  );
}

export function fullFilter(tasks: Task[], filters: FilterOptions) {
  let filteredTasks = [...tasks];

  if (filters.status) {
    filteredTasks = filterTaskByStatus(filteredTasks, filters.status);
  }
  if (filters.priority) {
    filteredTasks = filterTaskByPriority(filteredTasks, filters.priority);
  }
  if (filters.date) {
    filteredTasks = filterTaskByDate(filteredTasks, filters.date);
  }
  return filteredTasks;
}
