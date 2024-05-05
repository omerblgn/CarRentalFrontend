import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from '../../../models/carDetail';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.css',
})
export class CarsListComponent implements OnInit {
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
        window.location.reload();
        this.toastrService.success('Araba silindi');
      });
    });
  }
}
