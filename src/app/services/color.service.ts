import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = `${environment.apiUrl}/colors`;

  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = `${this.apiUrl}/getall`;
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getColorById(colorId: number): Observable<SingleResponseModel<Color>> {
    let newPath = `${this.apiUrl}/getbyid?id=${colorId}`;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  addColor(color: Color): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  updateColor(color: Color): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/update`;
    return this.httpClient.put<ResponseModel>(newPath, color);
  }

  deleteColor(color: Color): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/delete`;
    return this.httpClient.delete<ResponseModel>(newPath, {
      body: { id: color.id, name: color.name },
    });
  }
}
