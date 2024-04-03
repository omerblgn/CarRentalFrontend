import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded = false;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCarsWithDetails();
  }

  getCarsWithDetails() {
    this.carService.getCarsWithDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
