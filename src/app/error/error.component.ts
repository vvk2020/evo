import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  constructor(public dialogRef: MatDialogRef<ErrorComponent>) {}

  onConfirm(): void {
    this.dialogRef.close();
  }
}
