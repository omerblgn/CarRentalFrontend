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
import { OperationClaim } from '../../../../models/operationClaim';
import { OperationClaimService } from '../../../../services/operation-claim.service';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css',
})
export class EditRoleComponent implements OnInit {
  editRoleForm: FormGroup;
  role: OperationClaim;

  constructor(
    private formBuilder: FormBuilder,
    private operationClaimService: OperationClaimService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createEditRoleForm();

    this.route.params.subscribe((params) => {
      if (params['claimId']) {
        this.getClaimById(params['claimId']);
      }
    });
  }

  createEditRoleForm() {
    this.editRoleForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getClaimById(claimId: number) {
    this.operationClaimService
      .getOperationClaimById(claimId)
      .subscribe((response) => {
        this.role = response.data;
        this.editRoleForm.get('name')?.setValue(this.role.name);
      });
  }

  editRole() {
    let role = Object.assign({}, this.editRoleForm.value);
    role.id = this.role.id;

    this.operationClaimService.updateOperationClaim(role).subscribe(
      (response) => {
        this.toastrService.success('Role güncellendi');
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
