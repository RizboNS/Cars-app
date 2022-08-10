import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public id!: string
  public user!: User;
  public createCar: boolean = false

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id']
    })

    this.userService.getUser(this.id)
      .subscribe((data) => {
        this.initUser(data)
      })
  }
  initUser(data: User): void {
    this.user = data
  }
  initCreateCar(): void {
    if (!this.createCar) 
      this.createCar = true
    else
      this.createCar = false
  }

}