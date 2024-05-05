import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { NaviComponent } from './components/navi/navi.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NaviComponent,
    FilterComponent,
    FooterComponent,
    ScrollTopComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'car-rental';
  hideFilter = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          this.router.url.startsWith('/admin') ||
          this.router.url.startsWith('/auth') ||
          this.router.url.startsWith('/profile')
        ) {
          this.hideFilter = true;
        } else {
          this.hideFilter = false;
        }
      }
    });
  }
}
