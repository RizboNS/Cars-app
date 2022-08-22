import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenObj } from 'src/app/models/token-obj.model';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  private tokenObj!: TokenObj;
  public user = {
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(this.user);
  }
  onRegister() {
    this.authService.register(this.registerForm.value);
  }
}
