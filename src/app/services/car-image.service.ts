import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarImages } from '../models/carImages';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = `${environment.apiUrl}/carimages`;

  constructor(private httpClient: HttpClient) {}

  getCarImagesByCarId(carId: number): Observable<ListResponseModel<CarImages>> {
    let newPath = `${this.apiUrl}/getcarimagesbycarid?id=${carId}`;
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }

  getCarImages(): Observable<ListResponseModel<CarImages>> {
    let newPath = `${this.apiUrl}/getall`;
    return this.httpClient.get<ListResponseModel<CarImages>>(newPath);
  }

  addCarImages(formData: FormData): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }

  deleteCarImages(carImage: CarImages) {
    let newPath = `${this.apiUrl}/delete`;
    return this.httpClient.delete<ResponseModel>(newPath, {
      body: {
        id: carImage.id,
        carId: carImage.carId,
        imagePath: carImage.imagePath,
        date: carImage.date,
      },
    });
  }
}
