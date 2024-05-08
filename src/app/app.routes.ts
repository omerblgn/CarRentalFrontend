import { Routes } from '@angular/router';
import { AddBrandComponent } from './components/admin/admin-pages/brands-list/add-brand/add-brand.component';
import { BrandsListComponent } from './components/admin/admin-pages/brands-list/brands-list.component';
import { EditBrandComponent } from './components/admin/admin-pages/brands-list/edit-brand/edit-brand.component';
import { AddCarComponent } from './components/admin/admin-pages/cars-list/add-car/add-car.component';
import { CarsListComponent } from './components/admin/admin-pages/cars-list/cars-list.component';
import { EditCarComponent } from './components/admin/admin-pages/cars-list/edit-car/edit-car.component';
import { AddColorComponent } from './components/admin/admin-pages/colors-list/add-color/add-color.component';
import { ColorsListComponent } from './components/admin/admin-pages/colors-list/colors-list.component';
import { EditColorComponent } from './components/admin/admin-pages/colors-list/edit-color/edit-color.component';
import { AddRoleComponent } from './components/admin/admin-pages/roles-list/add-role/add-role.component';
import { EditRoleComponent } from './components/admin/admin-pages/roles-list/edit-role/edit-role.component';
import { RolesListComponent } from './components/admin/admin-pages/roles-list/roles-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
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
      { path: 'claims', component: RolesListComponent },
      { path: 'claims/add', component: AddRoleComponent },
      { path: 'claims/edit/:claimId', component: EditRoleComponent },
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
