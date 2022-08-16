import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenObj } from 'src/app/models/token-obj.model'; 
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup
  private tokenObj!: TokenObj
  public user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm  = this.fb.group(this.user)
  }
  onRegister() {
    console.log(this.registerForm.value)
    this.userService.register(this.registerForm.value).subscribe((res) => {
      localStorage.setItem('auth-token', res.token)
      this.tokenObj =  jwt_decode(res.token)
      this.router.navigate(['user', this.tokenObj._id])
    })

  }

}