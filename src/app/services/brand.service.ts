import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = `${environment.apiUrl}/brands`;

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = `${this.apiUrl}/getall`;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(brandId: number): Observable<SingleResponseModel<Brand>> {
    let newPath = `${this.apiUrl}/getbyid?id=${brandId}`;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  updateBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/update`;
    return this.httpClient.put<ResponseModel>(newPath, brand);
  }

  deleteBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/delete`;
    return this.httpClient.delete<ResponseModel>(newPath, {
      body: { id: brand.id, name: brand.name },
    });
  }
}
