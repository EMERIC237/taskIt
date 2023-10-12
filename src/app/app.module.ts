import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    TaskListComponent,
    AddTaskComponent,
  ],
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, MaterialsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
