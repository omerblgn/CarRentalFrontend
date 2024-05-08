import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimService } from '../../../../services/operation-claim.service';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css',
})
export class AddRoleComponent implements OnInit {
  addRoleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private operationClaimService: OperationClaimService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddRoleForm();
  }

  createAddRoleForm() {
    this.addRoleForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addRole() {
    let role = Object.assign({}, this.addRoleForm.value);

    this.operationClaimService.addOperationClaim(role).subscribe(
      (response) => {
        this.toastrService.success('Rol eklendi');
        window.location.assign('/admin/claims');
      },
      (responseError) => {
        if (responseError.error.ValidationErrors.length > 0) {
          for (
            let i = 0;
            i < responseError.error.ValidationErrors.length;
            i++
          ) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }
        }
      }
    );
  }
}
