import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../../models/brand';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brands-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css',
})
export class BrandsListComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  deleteBrand(brand: Brand) {
    this.brandService.deleteBrand(brand).subscribe((response) => {
      window.location.reload();
      this.toastrService.success('Marka silindi');
    });
  }
}
