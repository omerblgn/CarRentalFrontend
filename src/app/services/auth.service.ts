import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Token } from '../models/token';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginModel: Login): Observable<SingleResponseModel<Token>> {
    let newPath = `${this.apiUrl}/login`;
    return this.httpClient.post<SingleResponseModel<Token>>(
      newPath,
      loginModel
    );
  }

  register(registerModel: Register): Observable<SingleResponseModel<User>> {
    let newPath = `${this.apiUrl}/register`;
    return this.httpClient.post<SingleResponseModel<User>>(
      newPath,
      registerModel
    );
  }

  isAuthenticated() {
    if (this.localStorageService.get('token')) {
      return true;
    } else {
      return false;
    }
  }
}
