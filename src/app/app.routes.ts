import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddBrandComponent } from './components/pages/brands-list/add-brand/add-brand.component';
import { BrandsListComponent } from './components/pages/brands-list/brands-list.component';
import { EditBrandComponent } from './components/pages/brands-list/edit-brand/edit-brand.component';
import { AddCarComponent } from './components/pages/cars-list/add-car/add-car.component';
import { CarsListComponent } from './components/pages/cars-list/cars-list.component';
import { EditCarComponent } from './components/pages/cars-list/edit-car/edit-car.component';
import { AddColorComponent } from './components/pages/colors-list/add-color/add-color.component';
import { ColorsListComponent } from './components/pages/colors-list/colors-list.component';
import { EditColorComponent } from './components/pages/colors-list/edit-color/edit-color.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { adminGuard } from './guards/admin.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/cars' },
  { path: 'cars', component: CarComponent },
  // { path: 'cars/brand/:brandId', component: CarComponent },
  // { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'car/:carId', component: CarDetailComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [loginGuard, adminGuard],
    children: [
      { path: 'brands', component: BrandsListComponent },
      { path: 'brands/add', component: AddBrandComponent },
      { path: 'brands/edit/:brandId', component: EditBrandComponent },
      { path: 'colors', component: ColorsListComponent },
      { path: 'colors/add', component: AddColorComponent },
      { path: 'colors/edit/:colorId', component: EditColorComponent },
      { path: 'cars', component: CarsListComponent },
      { path: 'cars/add', component: AddCarComponent },
      { path: 'cars/edit/:carId', component: EditCarComponent },
    ],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [loginGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [loginGuard] },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'credit-cards',
    component: CreditCardsComponent,
    canActivate: [loginGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
