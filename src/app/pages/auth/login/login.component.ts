import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenObj } from 'src/app/models/token-obj.model';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm  = this.fb.group(this.user)
  }
  onLogin() {
    this.authService.login(this.loginForm.value)
  }
}
