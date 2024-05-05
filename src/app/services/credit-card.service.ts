import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  apiUrl = `${environment.apiUrl}/creditcards`;

  constructor(private httpClient: HttpClient) {}

  getCreditCardsByUserId(
    userId: number
  ): Observable<ListResponseModel<CreditCard>> {
    let newPath = `${this.apiUrl}/getbyuserid?userId=${userId}`;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  addCreditCard(creditCard: CreditCard): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }

  deleteCreditCard(creditCard: CreditCard): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/delete`;
    return this.httpClient.delete<ResponseModel>(newPath, { body: creditCard });
  }
}
