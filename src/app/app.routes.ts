import { Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { AddBrandComponent } from './components/pages/brands/add-brand/add-brand.component';
import { BrandsComponent } from './components/pages/brands/brands.component';
import { EditBrandComponent } from './components/pages/brands/edit-brand/edit-brand.component';
import { AddCarComponent } from './components/pages/cars/add-car/add-car.component';
import { CarsComponent } from './components/pages/cars/cars.component';
import { EditCarComponent } from './components/pages/cars/edit-car/edit-car.component';
import { AddColorComponent } from './components/pages/colors/add-color/add-color.component';
import { ColorsComponent } from './components/pages/colors/colors.component';
import { EditColorComponent } from './components/pages/colors/edit-color/edit-color.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/cars' },
  { path: 'cars', component: CarComponent },
  // { path: 'cars/brand/:brandId', component: CarComponent },
  // { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'car/:carId', component: CarDetailComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'brands/add', component: AddBrandComponent },
  { path: 'brands/edit/:brandId', component: EditBrandComponent },
  { path: 'colors', component: ColorsComponent },
  { path: 'colors/add', component: AddColorComponent },
  { path: 'colors/edit/:colorId', component: EditColorComponent },
  { path: 'carslist', component: CarsComponent },
  { path: 'cars/add', component: AddCarComponent },
  { path: 'cars/edit/:carId', component: EditCarComponent },
];
