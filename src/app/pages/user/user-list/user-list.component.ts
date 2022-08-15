import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: User[] = []


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }


  getUsers(){
    this.userService.getUsers().subscribe((res) => {
      this.users = res
    })
  }
}
