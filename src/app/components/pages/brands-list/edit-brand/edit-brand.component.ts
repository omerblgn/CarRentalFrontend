import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../../../models/brand';
import { BrandService } from '../../../../services/brand.service';

@Component({
  selector: 'app-edit-brand',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-brand.component.html',
  styleUrl: './edit-brand.component.css',
})
export class EditBrandComponent implements OnInit {
  editBrandForm: FormGroup;
  brand: Brand;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createEditBrandForm();

    this.route.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
      }
    });
  }

  createEditBrandForm() {
    this.editBrandForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.editBrandForm.get('name')?.setValue(this.brand.name);
    });
  }

  editBrand() {
    let brand = Object.assign({}, this.editBrandForm.value);
    brand.id = this.brand.id;

    this.brandService.updateBrand(brand).subscribe(
      (response) => {
        this.toastrService.success('Marka güncellendi');
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
