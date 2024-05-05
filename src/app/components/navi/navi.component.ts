import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NaviComponent implements OnInit {
  isAuthenticated = false;
  fullName = this.localStorageService.get('fullName');

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.localStorageService.clear();
    window.location.reload();
  }
}
