import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { TokenObj } from 'src/app/models/token-obj.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  private tokenObj!: TokenObj
  public user = {
    email: '',
    password: ''
  }
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm  = this.fb.group(this.user)
  }
  onLogin() {
    this.userService.login(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('auth-token', res.token)
        this.tokenObj =  jwt_decode(res.token)
        this.router.navigate(['user', this.tokenObj._id])
      }
    )
  }
}
