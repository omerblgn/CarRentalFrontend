import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../../../models/brand';
import { Color } from '../../../../models/color';
import { BrandService } from '../../../../services/brand.service';
import { CarService } from '../../../../services/car.service';
import { ColorService } from '../../../../services/color.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css',
})
export class AddCarComponent implements OnInit {
  addCarForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createAddCarForm();
  }

  createAddCarForm() {
    this.addCarForm = this.formBuilder.group({
      name: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
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

  addCar() {
    let car = Object.assign({}, this.addCarForm.value);

    this.carService.addCar(car).subscribe(
      (response) => {
        this.toastrService.success('Araba eklendi');
        window.location.assign('/admin/cars');
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
