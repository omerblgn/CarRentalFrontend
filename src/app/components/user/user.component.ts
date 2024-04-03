import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  dataLoaded = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
      this.dataLoaded = true;
    });
  }
}
