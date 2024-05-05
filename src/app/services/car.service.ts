import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = `${environment.apiUrl}/cars`;

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = `${this.apiUrl}/getall`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = `${this.apiUrl}/getbyid?id=${carId}`;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarsWithDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = `${this.apiUrl}/getcardetails`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarWithDetailsById(
    carId: number
  ): Observable<SingleResponseModel<CarDetail>> {
    let newPath = `${this.apiUrl}/getcardetailsbyid?id=${carId}`;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getCarsWithDetailsByBrand(
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = `${this.apiUrl}/getcardetailsbybrandid?id=${brandId}`;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsWithDetailsByColor(
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let newPath = `${this.apiUrl}/getcardetailsbycolorid?id=${colorId}`;
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
    let newPath = `${this.apiUrl}/getcardetailsbyfilters`;

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
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  updateCar(car: Car): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/update`;
    return this.httpClient.put<ResponseModel>(newPath, car);
  }

  deleteCar(car: Car): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/delete`;
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
