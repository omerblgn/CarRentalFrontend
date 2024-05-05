import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.css',
})
export class ScrollTopComponent {
  windowScrolled = false

  @HostListener('window:scroll', []) onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
    const scrollPercentage = (scrollOffset / (scrollHeight - windowHeight)) * 100;

    if (scrollPercentage >= 10 && scrollPercentage <= 95) {
      this.windowScrolled = true;
    } else {
      this.windowScrolled = false;
    }
  }
  
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
