export interface Rental {
  carId: number;
  customerId: number;
  rentStartDate: Date;
  rentEndDate: Date;
  returnDate: Date | null;
}
