import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AltertifyService } from '../../_services/altertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResults } from '../../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}, {value: 'other', display: 'Other'}];
  userParams: any = {};

  constructor(private userService: UserService, private alertify: AltertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.data.subscribe(data => {
     this.users = data['users'].results;
     this.pagination = data['users'].pagination;
   });
   this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
   this.userParams.minAge = 18;
   this.userParams.maxAge = 99;
   this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginationResults<User[]>) => {
      this.users = res.results;
      this.pagination = res.pagination;

    }, error => {
      this.alertify.error(error);
    });
  }

}