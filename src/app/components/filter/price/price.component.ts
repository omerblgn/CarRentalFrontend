import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css',
})
export class PriceComponent {
  minPrice: number | null;
  maxPrice: number | null;

  clearFilters() {
    this.minPrice = null;
    this.maxPrice = null;
  }
}
