import { Component, ViewChild } from '@angular/core';
import { AddTaskComponent } from './add-task/add-task.component';
import { Task } from 'src/models/Task';
import { TaskListComponent } from './task-list/task-list.component';
import { Observable, shareReplay, map, startWith } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'taskIt';
  isHandse$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      startWith(false),
      shareReplay()
    );

  @ViewChild(AddTaskComponent) addTaskComponent!: AddTaskComponent;
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}
  openAddTaskModal() {
    this.addTaskComponent.openModal();
  }
  toggleSidenav() {
    this.sidenav.toggle();
  }

  createNewTask(task: Task) {
    this.taskListComponent.addNewTask(task);
  }

  getHandsetMode(isHandset: boolean | null): MatDrawerMode {
    return isHandset === true ? 'over' : 'side';
  }
}
