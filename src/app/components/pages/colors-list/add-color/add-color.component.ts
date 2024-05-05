import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from '../../../../services/color.service';

@Component({
  selector: 'app-add-color',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.css',
})
export class AddColorComponent implements OnInit {
  addColorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddColorForm();
  }

  createAddColorForm() {
    this.addColorForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addColor() {
    let color = Object.assign({}, this.addColorForm.value);

    this.colorService.addColor(color).subscribe(
      (response) => {
        this.toastrService.success('Renk eklendi');
        window.location.assign('/admin/colors');
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
