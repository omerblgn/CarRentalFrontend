import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from '../../../models/color';
import { ColorService } from '../../../services/color.service';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css',
})
export class ColorsComponent implements OnInit {
  colors: Color[] = [];
  dataLoaded = false;
  deletingColor: Color;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  deleteColor(color: Color) {
    this.colorService.deleteColor(color).subscribe((response) => {
      this.toastrService
        .success('Renk silindi')
        .onHidden.subscribe(() => window.location.reload());
    });
  }
}
