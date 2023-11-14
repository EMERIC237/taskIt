import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  constructor(private router: Router) {}

  gotoTask() {
    this.router.navigateByUrl('/task-list');
  }
  gotoKanban() {
    this.router.navigateByUrl('/kanban-board');
  }
}
