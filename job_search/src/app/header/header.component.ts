import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loginForm: any;
  isLoggedIn: boolean | undefined;
  constructor(private router: Router) { }


  logout() {
    // this.loginForm.reset();
    this.isLoggedIn = false;

    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }
}
