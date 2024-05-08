import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class OperationClaimService {
  apiUrl = `${environment.apiUrl}/operationclaims`;

  constructor(private httpClient: HttpClient) {}

  getOperationClaims(): Observable<ListResponseModel<OperationClaim>> {
    let newPath = `${this.apiUrl}/getall`;
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }

  getOperationClaimById(
    id: number
  ): Observable<SingleResponseModel<OperationClaim>> {
    let newPath = `${this.apiUrl}/getbyid?id=${id}`;
    return this.httpClient.get<SingleResponseModel<OperationClaim>>(newPath);
  }

  addOperationClaim(operationClaim: OperationClaim): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<ResponseModel>(newPath, operationClaim);
  }

  updateOperationClaim(
    operationClaim: OperationClaim
  ): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/update`;
    return this.httpClient.put<ResponseModel>(newPath, operationClaim);
  }

  deleteOperationClaim(
    operationClaim: OperationClaim
  ): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/delete`;
    return this.httpClient.delete<ResponseModel>(newPath, {
      body: operationClaim,
    });
  }
}
