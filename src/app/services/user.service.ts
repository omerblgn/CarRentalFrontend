import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserClaim } from '../models/userClaim';
import { UserDetail } from '../models/userDetail';
import { UserDetailForUpdate } from '../models/userDetailForUpdate';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = `${environment.apiUrl}/users`;

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<ListResponseModel<User>> {
    let newPath = `${this.apiUrl}/getall`;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserDetailByEmail(
    userEmail: string
  ): Observable<SingleResponseModel<UserDetail>> {
    let newPath = `${this.apiUrl}/getuserdetailbyemail?email=${userEmail}`;
    return this.httpClient.get<SingleResponseModel<UserDetail>>(newPath);
  }

  updateUserDetail(
    updatedUser: UserDetailForUpdate
  ): Observable<SingleResponseModel<UserDetailForUpdate>> {
    let newPath = `${this.apiUrl}/updateuserdetail`;
    return this.httpClient.put<SingleResponseModel<UserDetailForUpdate>>(
      newPath,
      updatedUser
    );
  }

  getClaims(userId: number): Observable<ListResponseModel<UserClaim>> {
    let newPath = `${this.apiUrl}/getclaims?userId=${userId}`;
    return this.httpClient.get<ListResponseModel<UserClaim>>(newPath);
  }

  getUserByEmail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = `${this.apiUrl}/getbyemail?email=${email}`;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
