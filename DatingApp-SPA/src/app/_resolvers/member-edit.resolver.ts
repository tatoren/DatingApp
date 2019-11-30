import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AltertifyService } from '../_services/altertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alterify: AltertifyService, private auth: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.auth.decodedToken.nameid).pipe(
            catchError(error => {
                this.alterify.error('Problem retriving your data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
