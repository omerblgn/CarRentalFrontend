import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from '../../../../models/color';
import { ColorService } from '../../../../services/color.service';

@Component({
  selector: 'app-colors-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './colors-list.component.html',
  styleUrl: './colors-list.component.css',
})
export class ColorsListComponent implements OnInit {
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
      window.location.reload();
      this.toastrService.success('Renk silindi');
    });
  }
}
