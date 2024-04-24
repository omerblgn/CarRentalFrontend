import { Component, OnInit } from '@angular/core';
import { RentalDetail } from '../../models/rental-detail';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css',
})
export class RentalComponent implements OnInit {
  rentals: RentalDetail[] = [];
  dataLoaded = false;

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.rentalService.getRentalsDetails().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
}
