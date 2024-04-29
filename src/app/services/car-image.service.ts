import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImages } from '../models/carImages';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:7284/api/';

  constructor(private httpClient: HttpClient) {}

  getCarImagesByCarId(carId: number): Observable<ListResponseModel<CarImages>> {
    let newPath = this.apiUrl + 'carimages/getcarimagesbycarid?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }

  getCarImages(): Observable<ListResponseModel<CarImages>> {
    let newPath = this.apiUrl + 'carimages/getall';
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }

  addCarImages(formData: FormData): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'carimages/add';
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }
}
