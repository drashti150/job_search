import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  username: string = '';
  password: string = '';
  userIdCounter: number = 1;
  loginForm: any;
  isLoggedIn = false;

  constructor(private fb: FormBuilder, private router: Router) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      // Check if user is already logged in
      const storedLoginDetails = localStorage.getItem('loginDetails');
      if (!storedLoginDetails) {

        const userId = this.userIdCounter++;
        localStorage.setItem('loginDetails', JSON.stringify({ username, userId }));

        this.isLoggedIn = true;
        alert('log in Successfully.');

        this.router.navigate(['/jobs']);

      } else {
        alert('User is already logged in.');
      }
    }
  }

  storeUserDetails(): void {

    const storedLoginDetails = localStorage.getItem('loginDetails');
    if (storedLoginDetails) {
      const { username, userId } = JSON.parse(storedLoginDetails);

      const storedUserDetails = localStorage.getItem('storedUserDetails');
      let userDetails: { username: string, userId: number }[] = [];
      if (storedUserDetails) {
        userDetails = JSON.parse(storedUserDetails);
      }

      // Add the current user details to the array
      userDetails.push({ username, userId });

      localStorage.setItem('storedUserDetails', JSON.stringify(userDetails));
    }
  }

  getUserIdFromLocalStorage(): number | null {
    const storedLoginDetails = localStorage.getItem('loginDetails');
    if (storedLoginDetails) {
      const userDetailsArray: any[] = JSON.parse(storedLoginDetails);

      if (userDetailsArray.length > 0) {
        return userDetailsArray[0].userId;
      }
    }
    return null;
  }

}
