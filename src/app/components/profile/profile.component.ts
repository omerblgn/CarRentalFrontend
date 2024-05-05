import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../models/userDetail';
import { UserDetailForUpdate } from '../../models/userDetailForUpdate';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userDetail: UserDetail;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProfileForm();

    let email = this.localStorageService.get('email');
    if (email) {
      this.userService.getUserDetailByEmail(email).subscribe((response) => {
        this.userDetail = response.data;
        this.profileForm.patchValue({
          email: response.data.email,
          companyName: response.data.companyName,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        });
      });
    }
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      email: [
        { value: '', disabled: true },
        [Validators.required, noWhitespaceValidator()],
      ],
      companyName: ['', [Validators.required, noWhitespaceValidator()]],
      firstName: ['', [Validators.required, noWhitespaceValidator()]],
      lastName: ['', [Validators.required, noWhitespaceValidator()]],
      password: ['', noWhitespaceValidator()],
    });
  }

  updateProfile() {
    let updatedUser: UserDetailForUpdate = {
      ...this.userDetail,
      ...this.profileForm.value,
    };

    this.userService.updateUserDetail(updatedUser).subscribe(
      (response) => {
        this.localStorageService.set(
          'fullName',
          `${updatedUser.firstName} ${updatedUser.lastName}`
        );
        this.toastrService.success('Bilgiler başarıyla güncellendi');
      },
      (responseError) => {
        this.toastrService.error('Güncelleme başarısız');
      }
    );
  }
}

function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.trim().length === 0) {
      return { whitespace: true };
    }
    return null;
  };
}
