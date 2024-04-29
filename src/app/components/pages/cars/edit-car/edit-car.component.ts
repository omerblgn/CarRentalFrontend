import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../../../models/brand';
import { Car } from '../../../../models/car';
import { Color } from '../../../../models/color';
import { BrandService } from '../../../../services/brand.service';
import { CarService } from '../../../../services/car.service';
import { ColorService } from '../../../../services/color.service';

@Component({
  selector: 'app-edit-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-car.component.html',
  styleUrl: './edit-car.component.css',
})
export class EditCarComponent implements OnInit {
  editCarForm: FormGroup;
  cars: Car;
  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createEditCarForm();
    this.getBrands();
    this.getColors();

    this.route.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
      }
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  createEditCarForm() {
    this.editCarForm = this.formBuilder.group({
      name: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.cars = response.data;
      this.editCarForm.get('name')?.setValue(this.cars.name);
      this.editCarForm.get('brandId')?.setValue(this.cars.brandId);
      this.editCarForm.get('colorId')?.setValue(this.cars.colorId);
      this.editCarForm.get('modelYear')?.setValue(this.cars.modelYear);
      this.editCarForm.get('dailyPrice')?.setValue(this.cars.dailyPrice);
      this.editCarForm.get('description')?.setValue(this.cars.description);
    });
  }

  editCar() {
    let car = Object.assign({}, this.editCarForm.value);
    car.id = this.cars.id;

    this.carService.updateCar(car).subscribe(
      (response) => {
        this.toastrService.success('Araba güncellendi');
        window.location.assign('/carslist');
      },
      (error) => {
        if (error.error.ValidationErrors.length > 0) {
          for (let i = 0; i < error.error.ValidationErrors.length; i++) {
            this.toastrService.error(
              error.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }
        }
      }
    );
  }
}
