import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CreditCard } from '../../models/creditCard';
import { Rental } from '../../models/rental';
import { CreditCardService } from '../../services/credit-card.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { PaymentService } from '../../services/payment.service';
import { RentalService } from '../../services/rental.service';
import { UserService } from '../../services/user.service';

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
  creditCards: CreditCard[] = [];

  constructor(
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private creditCardService: CreditCardService,
    private userService: UserService
  ) {
    this.rental = this.router.getCurrentNavigation()?.extras.state;
    this.rentalDetails = this.rental.rental;
  }

  ngOnInit(): void {
    this.createPaymentForm();
    this.getCreditCard();
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
      saveCreditCard: [''],
    });
  }

  payment() {
    this.paymentService.payment().subscribe((response) => {
      if (response.success) {
        this.toastr.success('Ödeme başarılı');
        this.addRental();

        if (this.paymentForm.get('saveCreditCard')?.value) {
          this.addCreditCard();
        }

        this.router.navigate(['/cars']);
      } else {
        this.toastr.error('Ödeme alınamadı');
      }
    });
  }

  addRental() {
    this.rentalService.rent(this.rentalDetails).subscribe((response) => {
      this.toastr.success('Araba kiralandı');
    });
  }

  getCreditCard() {
    const email = this.localStorageService.get('email');
    if (email) {
      this.userService.getUserByEmail(email).subscribe((response) => {
        this.creditCardService
          .getCreditCardsByUserId(response.data.id)
          .subscribe((response) => {
            this.creditCards = response.data;
          });
      });
    }
  }

  addCreditCard() {
    const email = this.localStorageService.get('email');
    if (email) {
      this.userService.getUserDetailByEmail(email).subscribe((response) => {
        let creditCard = Object.assign(
          { userId: response.data.userId },
          this.paymentForm.value,
          {
            cardNumber: this.paymentForm.get('cardNumber')?.value.toString(),
            cvv: this.paymentForm.get('cvv')?.value.toString(),
          }
        );

        this.creditCardService.addCreditCard(creditCard).subscribe(
          (response) => {
            this.toastr.success('Kredi kartı kaydedildi');
          },
          (responseError) => {
            this.toastr.error(responseError.error.message);
          }
        );
      });
    }
  }

  onCardSelect(event: any) {
    const cardId = event.target.value;
    const selectedCard = this.creditCards.find((c) => c.id == cardId);
    if (selectedCard) {
      this.paymentForm.patchValue({
        cardName: selectedCard.cardName,
        cardNumber: selectedCard.cardNumber,
        expiryMonth: selectedCard.expiryMonth,
        expiryYear: selectedCard.expiryYear,
        cvv: selectedCard.cvv,
      });
    }
  }
}
