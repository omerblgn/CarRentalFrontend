import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css',
})
export class NaviComponent {}
