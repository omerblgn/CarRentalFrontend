import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarDetail } from '../../models/carDetail';
import { CarImages } from '../../models/carImages';
import { CarImageService } from '../../services/car-image.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  carsDetail: CarDetail[] = [];
  carImages: CarImages[] = [];
  thumbnailImage: string[] = [];
  dataLoaded = false;
  baseUrl = 'https://localhost:7284';
  fakeArray = Array(6);

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsWithDetailsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsWithDetailsByColor(params['colorId']);
      } else {
        this.getCarsWithDetails();
      }
    });
  }

  getCarsWithDetails() {
    this.carService.getCarsWithDetails().subscribe((response) => {
      this.carsDetail = response.data;
      this.getCarImages();
    });
  }

  getCarsWithDetailsByBrand(brandId: number) {
    this.carService.getCarsWithDetailsByBrand(brandId).subscribe((response) => {
      this.carsDetail = response.data;
      this.getCarImages();
    });
  }

  getCarsWithDetailsByColor(brandId: number) {
    this.carService.getCarsWithDetailsByColor(brandId).subscribe((response) => {
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
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      let result = response.data;
      const firstImage = result[0];
      if (firstImage.imagePath.startsWith('wwwroot')) {
        this.thumbnailImage[carId] =
          this.baseUrl + firstImage.imagePath.substring(7);
      } else {
        this.thumbnailImage[carId] = this.baseUrl + firstImage.imagePath;
      }
      this.dataLoaded = true;
    });
  }
}
