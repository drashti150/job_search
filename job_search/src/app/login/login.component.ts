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
          // Store login details in local storage with the next available user ID
          const userId = this.userIdCounter++;
          localStorage.setItem('loginDetails', JSON.stringify({ username, userId }));
          this.isLoggedIn = true;
        } else {
          alert('User is already logged in.');
        }
      }
    }
  }