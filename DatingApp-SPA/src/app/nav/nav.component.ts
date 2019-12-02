import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AltertifyService } from '../_services/altertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alterify: AltertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currenPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alterify.success('Logged in Successfuly');
    }, error => {
     this.alterify.error(error);
  }, () => {
    this.router.navigate(['/members']);
  }
  );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alterify.message('Logged Out');
    this.router.navigate(['/home']);
  }
}
