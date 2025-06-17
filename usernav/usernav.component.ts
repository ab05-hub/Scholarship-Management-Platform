import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
 
  constructor(private router: Router, private authService: AuthService){}
 
  ngOnInit(): void {
    this.checkLoginStatus();
  }
 
  // Method to check login status and user role
  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }
 
  // Method to handle logout
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
