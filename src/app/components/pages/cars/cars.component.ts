import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../../../models/car';
import { CarDetail } from '../../../models/carDetail';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent implements OnInit {
  carDetails: CarDetail[] = [];
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails() {
    this.carService.getCarsWithDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  deleteCar(carDetail: CarDetail) {
    this.carService.getCarById(carDetail.id).subscribe((carToDelete) => {
      this.carService.deleteCar(carToDelete.data).subscribe((response) => {
        this.toastrService
          .success('Araba silindi')
          .onHidden.subscribe(() => window.location.reload());
      });
    });
  }
}
