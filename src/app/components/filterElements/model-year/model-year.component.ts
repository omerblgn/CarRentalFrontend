import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-model-year',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './model-year.component.html',
  styleUrl: './model-year.component.css',
})
export class ModelYearComponent {
  minYear = '';
  maxYear = '';

  clearFilters() {
    this.minYear = '';
    this.maxYear = '';
  }
}
