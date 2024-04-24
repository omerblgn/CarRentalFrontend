import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarDetail } from '../../models/carDetail';
import { CarImages } from '../../models/carImages';
import { CarFilterPipe } from '../../pipes/car-filter.pipe';
import { CarImageService } from '../../services/car-image.service';
import { CarService } from '../../services/car.service';
import { BrandComponent } from '../filterElements/brand/brand.component';
import { ColorComponent } from '../filterElements/color/color.component';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CarFilterPipe,
    BrandComponent,
    ColorComponent,
    CommonModule,
  ],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  carsDetail: CarDetail[] = [];
  carImages: CarImages[] = [];
  thumbnailImage: string[] = [];
  dataLoaded = false;
  fakeArray = Array(6);
  filterText: '';

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.getCarsWithDetailsByColorAndBrand(
        params['brandNames'],
        params['colorNames'],
        params['minPrice'],
        params['maxPrice'],
        params['minYear'],
        params['maxYear']
      );
    });
  }

  getCarsWithDetailsByColorAndBrand(
    brandNames: string,
    colorNames: string,
    minPrice: number,
    maxPrice: number,
    minYear: string,
    maxYear: string
  ) {
    this.carService
      .getCarsWithDetailsByColorAndBrand(
        brandNames,
        colorNames,
        minPrice,
        maxPrice,
        minYear,
        maxYear
      )
      .subscribe((response) => {
        this.carsDetail = response.data;
        this.getCarImages();
      });
  }

  getCarImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.carsDetail.forEach((car) => {
        this.getThumbnailImage(car.id);
      });
    });
  }

  getThumbnailImage(carId: number) {
    let filteredImages = this.carImages.filter((c) => c.carId == carId);
    if (filteredImages.length !== 0) {
      let firstImagePath = filteredImages[0].imagePath;
      this.createImageUrl(firstImagePath, carId);
    } else {
      this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
        let firstImagePath = response.data[0].imagePath;
        this.createImageUrl(firstImagePath, carId);
      });
    }
    this.dataLoaded = true;
  }

  createImageUrl(imagePath: string, carId: number) {
    const baseUrl = 'https://localhost:7284';
    if (imagePath.startsWith('wwwroot')) {
      this.thumbnailImage[carId] = baseUrl + imagePath.substring(7);
    } else {
      this.thumbnailImage[carId] = baseUrl + imagePath;
    }
  }
}
