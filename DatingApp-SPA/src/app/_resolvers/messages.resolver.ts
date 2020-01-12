import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AltertifyService } from '../_services/altertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    MessageContainer = 'Unread';

    constructor(private userService: UserService, private authService: AuthService,
                private router: Router, private alterify: AltertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
                this.pageNumber, this.pageSize, this.MessageContainer).pipe(
            catchError(error => {
                this.alterify.error('Problem retriving messages' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
