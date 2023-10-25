import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { FormTaskDialogComponent } from './components/form-task-dialog/form-task-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';
import { ViewTaskDialogComponent } from './components/view-task-dialog/view-task-dialog.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    TaskListComponent,
    AddTaskComponent,
    FormTaskDialogComponent,
    KanbanBoardComponent,
    TaskCardComponent,
    LandingPageComponent,
    SignUpComponent,
    LoginComponent,
    WarningDialogComponent,
    ViewTaskDialogComponent,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialsModule,
    DragDropModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
