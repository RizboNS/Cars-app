import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenObj } from 'src/app/models/token-obj.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  private tokenObj!: TokenObj;
  public user = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  };
  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(this.user);
  }
  onLogin() {
    this.authService.login(this.loginForm.value);
  }
}
