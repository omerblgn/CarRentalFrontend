import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarDetail } from '../../models/carDetail';
import { CarImages } from '../../models/carImages';
import { CarImageService } from '../../services/car-image.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css',
})
export class CarDetailComponent implements OnInit {
  car: CarDetail;
  carImages: CarImages[] = [];
  baseUrl = 'https://localhost:7284';
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
      }
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarWithDetailsById(carId).subscribe((response) => {
      this.car = response.data;

      this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
        this.carImages = response.data;
        this.dataLoaded = true;
      });
    });
  }

  getImagePath(imagePath: string) {
    if (imagePath.startsWith('wwwroot')) {
      return this.baseUrl + imagePath.substring(7);
    } else {
      return this.baseUrl + imagePath;
    }
  }
}
