import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './shared/auth.guard';
import { appRoutes } from './data/routes';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: appRoutes.home, component: LandingPageComponent },
  { path: appRoutes.signup, component: SignUpComponent },
  { path: appRoutes.login, component: LoginComponent },
  {
    path: appRoutes.taskList,
    component: TaskListComponent,
    // canActivate: [authGuard],
  },
  {
    path: appRoutes.kanbanBoard,
    component: KanbanBoardComponent,
    // canActivate: [authGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
