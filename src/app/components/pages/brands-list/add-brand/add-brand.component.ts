import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../../../services/brand.service';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css',
})
export class AddBrandComponent implements OnInit {
  addBrandForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddBrandForm();
  }

  createAddBrandForm() {
    this.addBrandForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addBrand() {
    let brand = Object.assign({}, this.addBrandForm.value);

    this.brandService.addBrand(brand).subscribe(
      (response) => {
        this.toastrService.success('Marka eklendi');
        window.location.assign('/admin/brands');
      },
      (error) => {
        if (error.error.ValidationErrors.length > 0) {
          for (let i = 0; i < error.error.ValidationErrors.length; i++) {
            this.toastrService.error(
              error.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }
        }
      }
    );
  }
}
