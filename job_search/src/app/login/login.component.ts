import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../job.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLoginForm(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      // Simulate successful login for demonstration
      if (username === 'admin' && password === 'password') {
        console.log('Login successful');
        // Redirect to admin component
        this.router.navigate(['/admin']);
      } else {
        console.log('Invalid username or password');
      }

      this.loginForm.reset();
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  
}
}
  // loginForm: FormGroup;

  // constructor(private formBuilder: FormBuilder, private router: Router) {
  //   this.loginForm = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  // submitLoginForm() {
  //   console.log("Log in Successfully!")
  //   this.router.navigate(['/resumes']);
  // }





//   onSubmit(): void {
//     const passwordControl = this.loginForm.get('password');
//     if (passwordControl) {
//       const password = passwordControl.value;
//       // Continue with your logic
//     } else {
//       console.error('Password control is null or undefined');
//     }
//   }

