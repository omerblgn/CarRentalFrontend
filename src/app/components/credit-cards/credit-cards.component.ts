import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from '../../models/creditCard';
import { CreditCardService } from '../../services/credit-card.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-credit-cards',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.css',
})
export class CreditCardsComponent implements OnInit {
  creditCards: CreditCard[] = [];
  dataLoaded = false;

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    const email = this.localStorageService.get('email');
    if (email) {
      this.userService.getUserDetailByEmail(email).subscribe((response) => {
        this.getCreditCards(response.data.userId);
      });
    }
  }

  getCreditCards(userId: number) {
    this.creditCardService
      .getCreditCardsByUserId(userId)
      .subscribe((response) => {
        this.creditCards = response.data;
      });
    this.dataLoaded = true;
  }

  deleteCard(creditCard: CreditCard) {
    this.creditCardService
      .deleteCreditCard(creditCard)
      .subscribe((response) => {
        window.location.reload();
        this.toastrService.success('Kart silindi');
      });
  }
}
