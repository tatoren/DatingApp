import { Component, OnInit } from '@angular/core';
import { Pagination, PaginationResults } from '../_models/pagination';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AltertifyService } from '../_services/altertify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService, private userService: UserService,
              private route: ActivatedRoute, private alertify: AltertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].results;
      this.pagination = data['users'].pagination;
    });

    this.likesParam = 'Likers';
    console.log(this.route.data);
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
    .subscribe((res: PaginationResults<User[]>) => {
      this.users = res.results;
      this.pagination = res.pagination;

    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
