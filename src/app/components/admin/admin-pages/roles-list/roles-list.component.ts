import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from '../../../../models/operationClaim';
import { OperationClaimService } from '../../../../services/operation-claim.service';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css',
})
export class RolesListComponent implements OnInit {
  roles: OperationClaim[] = [];
  dataLoaded = false;

  constructor(
    private operationClaimService: OperationClaimService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getOperationClaims();
  }

  getOperationClaims() {
    this.operationClaimService.getOperationClaims().subscribe((response) => {
      this.roles = response.data;
      this.dataLoaded = true;
    });
  }

  deleteOperationClaim(operationClaim: OperationClaim) {
    this.operationClaimService
      .deleteOperationClaim(operationClaim)
      .subscribe((response) => {
        window.location.reload();
        this.toastrService.success('Rol silindi');
      });
  }
}
