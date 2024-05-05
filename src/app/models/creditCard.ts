export interface CreditCard {
  id: number;
  userId: number;
  cardName: string;
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
}
