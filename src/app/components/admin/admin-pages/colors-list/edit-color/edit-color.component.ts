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
import { Color } from '../../../../../models/color';
import { ColorService } from '../../../../../services/color.service';

@Component({
  selector: 'app-edit-color',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-color.component.html',
  styleUrl: './edit-color.component.css',
})
export class EditColorComponent implements OnInit {
  editColorForm: FormGroup;
  color: Color;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createEditColorForm();

    this.route.params.subscribe((params) => {
      if (params['colorId']) {
        this.getColorById(params['colorId']);
      }
    });
  }

  createEditColorForm() {
    this.editColorForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getColorById(colorId: number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      this.color = response.data;
      this.editColorForm.get('name')?.setValue(this.color.name);
    });
  }

  editColor() {
    let color = Object.assign({}, this.editColorForm.value);
    color.id = this.color.id;

    this.colorService.updateColor(color).subscribe(
      (response) => {
        this.toastrService.success('Renk güncellendi');
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
