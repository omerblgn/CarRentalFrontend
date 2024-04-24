import { Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/cars' },
  { path: 'cars', component: CarComponent },
  // { path: 'cars/brand/:brandId', component: CarComponent },
  // { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'car/:carId', component: CarDetailComponent },
  { path: 'payment', component: PaymentComponent },
];
