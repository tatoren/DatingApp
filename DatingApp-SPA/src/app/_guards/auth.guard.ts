import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AltertifyService } from '../_services/altertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alterify: AltertifyService) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()){
      return true;
    }

    this.alterify.error('Unauthorized Access');
    this.router.navigate(['/home']);
    return false;
  }
}
