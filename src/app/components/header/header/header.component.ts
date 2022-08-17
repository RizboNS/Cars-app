import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }
  readToken(): string {
    return this.authService.getUserIdFromToken()
  }
  navigateToProfile() {
    const userId = this.readToken()
    if (userId != '') {
      this.router.navigate(['user', userId])
    }
    else {
      this.router.navigate(['login'])
    }
  }
  onLogout(){
    this.authService.logout()
    this.router.navigate(['/'])
  }

}
