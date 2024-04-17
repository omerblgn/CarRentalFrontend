import { Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'car/:carId', component: CarDetailComponent },
];
