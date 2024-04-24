import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CarDetail } from '../../models/carDetail';
import { CarImages } from '../../models/carImages';
import { Rental } from '../../models/rental';
import { CarImageService } from '../../services/car-image.service';
import { CarService } from '../../services/car.service';
import { RentalService } from '../../services/rental.service';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { error } from 'console';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, DatepickerComponent, ToastrModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css',
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetail;
  carImages: CarImages[] = [];
  baseUrl = 'https://localhost:7284';
  dataLoaded = false;
  fromDate: Date;
  toDate: Date;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarWithDetailsById(carId).subscribe((response) => {
      this.carDetail = response.data;

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

  rentCar() {
    if (!this.fromDate || !this.toDate) {
      this.toastr.error('Tarih seçmediniz');
      return;
    }

    let rental: Rental = {
      carId: this.carDetail.id,
      customerId: 5, //////giriş yapan kullanıcının id'si
      rentStartDate: this.fromDate,
      rentEndDate: this.toDate,
      returnDate: null,
    };

    this.rentalService.isRentable(rental).subscribe(
      (response) => {
        this.router.navigate(['/payment'], { state: { rental: rental } });
      },
      (error) => {
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message, 'Bu arabayı kiralayamazsınız');
        }
      }
    );
  }

  setFromDate(fromDate: NgbDate) {
    this.fromDate = new Date(fromDate.year, fromDate.month - 1, fromDate.day);
  }

  setToDate(toDate: NgbDate) {
    this.toDate = new Date(toDate.year, toDate.month - 1, toDate.day);
  }
}
