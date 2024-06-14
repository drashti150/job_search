import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetalertService } from '../sweetalert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  email: string = '';
  password: string = '';
  userIdCounter: number = 1;
  loginForm: FormGroup;
  isLoggedIn = false;
  userDetails: any = {};
  lastUserId: number = parseInt(localStorage.getItem('lastLoginUserId') || '0');
  storedUserDetails: { email: string, userId: number }[] = JSON.parse(localStorage.getItem('storedUserDetails') || '[]');

  constructor(private fb: FormBuilder, private router: Router, private sweetAlertService: SweetalertService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    const user = localStorage.getItem('user');
    if (user) {
      this.userDetails = JSON.parse(user);
      this.isLoggedIn = true;
    }
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
  
      const emailExists = this.storedUserDetails.some(user => user.email === email);
  
      if (emailExists) {
         this.sweetAlertService.showErrorAlert('Oops...','Email already exists. Please use a different email.')
      
        return;
      }
  
      this.isLoggedIn = true;
      this.lastUserId++;
      localStorage.setItem('lastLoginUserId', this.lastUserId.toString());
  
      this.userDetails = {
        email: email,
        userId: this.lastUserId
      };
  
      this.storedUserDetails.push(this.userDetails);
      
      this.sweetAlertService.showSuccessAlert('Success','Login Successfully.')

      localStorage.setItem('storedUserDetails', JSON.stringify(this.storedUserDetails));
      
      this.router.navigate(['/resumes']);
  
      localStorage.setItem('user', JSON.stringify(this.userDetails));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}

