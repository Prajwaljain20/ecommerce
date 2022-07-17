import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  searchUsers: IUser[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe((data) => {
      this.searchUsers = this.users = data;
      this.loading = false;
    });
  }
  search(data: string) {
    this.searchUsers = data
      ? this.users.filter(
          (item) =>
            item.email?.toLowerCase().includes(data.toLowerCase()) ||
            item.name?.toLowerCase().includes(data.toLowerCase())
        )
      : this.users;
  }
}
