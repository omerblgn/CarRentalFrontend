import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Rental } from '../../models/rental';
import { PaymentService } from '../../services/payment.service';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ToastrModule, CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  rentalDetails: Rental;
  rental: any;

  constructor(
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router
  ) {
    this.rental = this.router.getCurrentNavigation()?.extras.state;
    this.rentalDetails = this.rental.rental;
  }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryMonth: [
        '',
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      expiryYear: [
        '',
        [Validators.required, Validators.min(0), Validators.max(99)],
      ],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  payment() {
    this.paymentService.payment().subscribe((response) => {
      if (response.success) {
        this.toastr.success('Ödeme başarılı');

        this.rentalService.rent(this.rentalDetails).subscribe((response) => {
          this.toastr
            .success('Araba kiralandı')
            .onHidden.subscribe(() => this.location.back());
        });
      } else {
        this.toastr.error('Ödeme alınamadı');
      }
    });
  }
}
