import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rental-detail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = `${environment.apiUrl}/rentals`;

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = `${this.apiUrl}/getall`;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalsDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = `${this.apiUrl}/getrentalsdetails`;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  isRentable(rental: Rental): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/isrentable`;
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  rent(rental: Rental): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
