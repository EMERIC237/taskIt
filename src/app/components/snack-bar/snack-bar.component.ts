import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
interface snackBarData {
  message: string;
  color: string;
}
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  message: string;
  color: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) data: snackBarData) {
    this.message = data.message;
    this.color = data.color;
  }
  getTextColor(): string {
    switch (this.color) {
      case 'red':
        return 'white';
      case 'green':
        return 'black';
      case 'yellow':
        return 'black';
      default:
        return 'black';
    }
  }
}
