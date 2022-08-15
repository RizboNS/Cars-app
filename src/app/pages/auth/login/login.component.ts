import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  public user = {
    email: '',
    password: ''
  }
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm  = this.fb.group(this.user)
  }
  onLogin() {

    console.log(this.loginForm.value)
    this.userService.login(this.loginForm.value).subscribe((res) => {
      console.log(res)
    }
    )

  }
}
