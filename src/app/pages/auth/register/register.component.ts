import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup
  public user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.registerForm  = this.fb.group(this.user)
  }
  onRegister() {
    console.log(this.registerForm.value)
    this.userService.register(this.registerForm.value).subscribe((res) => {
      console.log(res)
    })

  }

}
