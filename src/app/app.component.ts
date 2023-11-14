import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AddTaskComponent } from './add-task/add-task.component';
import { Task } from 'src/models/Task';
import { TaskListComponent } from './task-list/task-list.component';
import { Observable, shareReplay, map, startWith } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  title = 'taskIt';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      startWith(false),
      shareReplay()
    );

  @ViewChild(AddTaskComponent) addTaskComponent!: AddTaskComponent;
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}
  openAddTaskModal() {
    this.addTaskComponent.openModal();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
  toggleSidenav() {
    this.sidenav.toggle();
  }

  createNewTask(task: Task) {
    this.taskListComponent.addNewTask(task);
  }

  getHandsetMode(isHandsett: boolean | null): MatDrawerMode {
    return isHandsett === true ? 'over' : 'side';
  }

  ngOnDestroy(): void {
    this.authService.currentUser.unsubscribe();
  }
}
