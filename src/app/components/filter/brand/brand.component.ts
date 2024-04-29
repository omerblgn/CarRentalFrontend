import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Brand } from '../../../models/brand';
import { BrandFilterPipe } from '../../../pipes/brand-filter.pipe';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, BrandFilterPipe],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;
  filterText = '';
  selectedBrands: { [key: string]: boolean } = {};

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  clearFilters() {
    this.selectedBrands = {};
    this.filterText = '';
  }
}
