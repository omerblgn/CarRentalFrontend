import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = `${environment.apiUrl}/carimages`;

  constructor(private httpClient: HttpClient) {}

  getCarImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = `${this.apiUrl}/getcarimagesbycarid?id=${carId}`;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImages(): Observable<ListResponseModel<CarImage>> {
    let newPath = `${this.apiUrl}/getall`;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  addCarImages(formData: FormData): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }

  deleteCarImages(carImage: CarImage) {
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
