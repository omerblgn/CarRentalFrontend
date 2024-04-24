import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rental-detail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:7284/api/';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalsDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentals/getrentalsdetails';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  isRentable(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/isrentable';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  rent(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'rentals/add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
