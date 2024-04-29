import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
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

  getCarsWithDetailsByColorAndBrand(
    brandNames?: string,
    colorNames?: string,
    minPrice?: number,
    maxPrice?: number,
    minYear?: string,
    maxYear?: string
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbyfilters';

    const queryParams = this.buildQueryParams({
      brandNames,
      colorNames,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
    });

    if (queryParams) {
      newPath += '?' + queryParams;
    }

    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  addCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  updateCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/update';
    return this.httpClient.put<ResponseModel>(newPath, car);
  }

  deleteCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/delete';
    return this.httpClient.delete<ResponseModel>(newPath, { body: car });
  }

  buildQueryParams(params: { [key: string]: any }): string {
    const queryParams: string[] = [];

    for (const key in params) {
      if (
        params.hasOwnProperty(key) &&
        params[key] !== undefined &&
        params[key] !== null
      ) {
        queryParams.push(`${key}=${params[key]}`);
      }
    }

    return queryParams.join('&');
  }
}
