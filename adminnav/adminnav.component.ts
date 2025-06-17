import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
 
  constructor( private authService: AuthService){}
 
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
    // this.router.navigate(['/login']);
  }
}
