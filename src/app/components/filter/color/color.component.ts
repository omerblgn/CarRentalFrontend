import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Color } from '../../../models/color';
import { ColorFilterPipe } from '../../../pipes/color-filter.pipe';
import { ColorService } from '../../../services/color.service';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ColorFilterPipe],
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  dataLoaded = false;
  filterText = '';
  selectedColors: { [key: string]: boolean } = {};

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  clearFilters() {
    this.selectedColors = {};
    this.filterText = '';
  }
}
