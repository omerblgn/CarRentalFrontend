import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const localStorageService = inject(LocalStorageService);

  return new Observable<boolean>((observer) => {
    const email = localStorageService.get('email');
    if (email) {
      userService.getUserDetailByEmail(email).subscribe((response) => {
        userService
          .getClaims(response.data.userId)
          .pipe(
            map((response) => {
              const isAdmin = response.data.some(
                (claim) => claim.name === 'admin'
              );
              if (isAdmin) {
                return observer.next(true);
              } else {
                toastr.warning('Yetkiniz yok');
                router.navigate(['/']);
                return observer.next(false);
              }
            })
          )
          .subscribe();
      });
    }
  });
};
