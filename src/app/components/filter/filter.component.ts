import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { ColorComponent } from './color/color.component';
import { ModelYearComponent } from './model-year/model-year.component';
import { PriceComponent } from './price/price.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    BrandComponent,
    ColorComponent,
    PriceComponent,
    ModelYearComponent,
    CommonModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  @ViewChild(BrandComponent) brandComponent: BrandComponent;
  @ViewChild(ColorComponent) colorComponent: ColorComponent;
  @ViewChild(PriceComponent) priceComponent: PriceComponent;
  @ViewChild(ModelYearComponent) modelYearComponent: ModelYearComponent;

  isExpanded: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setCollapseInitialValue();
  }

  setCollapseInitialValue() {
    if (window.innerWidth >= 767.98) {
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  }

  toggleCollapse() {
    this.isExpanded = !this.isExpanded;
  }

  clearFilters() {
    this.brandComponent.clearFilters();
    this.colorComponent.clearFilters();
    this.priceComponent.clearFilters();
    this.modelYearComponent.clearFilters();
  }

  applyFilters() {
    const selectedBrands = this.formatSelectedItems(
      this.brandComponent.selectedBrands
    );
    const selectedColors = this.formatSelectedItems(
      this.colorComponent.selectedColors
    );

    const minPrice = this.priceComponent.minPrice;
    const maxPrice = this.priceComponent.maxPrice;

    const queryParams: any = {
      brandNames: selectedBrands || undefined,
      colorNames: selectedColors || undefined,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minYear: this.modelYearComponent.minYear || undefined,
      maxYear: this.modelYearComponent.maxYear || undefined,
    };

    this.router.navigate(['/cars'], { queryParams });
  }

  formatSelectedItems(selectedItems: any): string {
    return Object.entries(selectedItems)
      .filter(([item, selected]) => selected == true)
      .map(([item]) => item)
      .join(',');
  }
}
