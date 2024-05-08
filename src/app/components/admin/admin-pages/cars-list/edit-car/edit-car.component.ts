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
import { Brand } from '../../../../../models/brand';
import { Car } from '../../../../../models/car';
import { CarImage } from '../../../../../models/carImage';
import { Color } from '../../../../../models/color';
import { BrandService } from '../../../../../services/brand.service';
import { CarImageService } from '../../../../../services/car-image.service';
import { CarService } from '../../../../../services/car.service';
import { ColorService } from '../../../../../services/color.service';

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
  carImages: CarImage[] = [];
  selectedFiles: File[] = [];
  baseUrl = 'https://localhost:7284';
  maxImagesErrorMessage: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService,
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
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }

  createEditCarForm() {
    this.editCarForm = this.formBuilder.group({
      name: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      carImages: [''],
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

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data.filter(
        (image) => !image.imagePath.includes('defaultCarImage')
      );
    });
  }

  selectFiles(event: any) {
    this.selectedFiles = event.target.files;
    if (!this.selectedFiles) {
      return;
    }

    if (this.selectedFiles.length + this.carImages.length > 5) {
      event.target.value = '';
      this.maxImagesErrorMessage =
        'Bir arabanın en fazla 5 tane resmi olabilir';
      return;
    }

    this.maxImagesErrorMessage = null;
  }

  editCar() {
    let car = Object.assign({}, this.editCarForm.value);
    car.id = this.cars.id;

    this.carService.updateCar(car).subscribe(
      (response) => {
        const formData = new FormData();
        for (const file of this.selectedFiles) {
          formData.append('CarId', car.id.toString());
          formData.append('FormFiles', file);
        }
        this.addCarImages(formData);

        this.toastrService.success('Araba güncellendi');
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

  addCarImages(formData: FormData) {
    this.carImageService.addCarImages(formData).subscribe((response) => {
      this.toastrService.success('Resim eklendi');
    });
  }

  deleteImage(carImage: CarImage) {
    this.carImageService.deleteCarImages(carImage).subscribe((response) => {
      this.toastrService.success('Resim silindi');
      window.location.reload();
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
