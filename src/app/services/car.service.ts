import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:7284/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarsWithDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarWithDetailsById(
    carId: number
  ): Observable<SingleResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getCarsWithDetailsByBrand(
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbybrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsWithDetailsByColor(
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbycolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
