import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css']
})
export class ResumesComponent {
  
    isLoggedIn = false;
    loginForm: FormGroup;
    jobApplicationForm: FormGroup;
    userIdCounter: number = 1; // Initialize user ID counter
  router: any;
  
    constructor(private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  
      this.jobApplicationForm = this.fb.group({
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        resume: ['', Validators.required],
        message: [''],
        linkedin: [''],
        skills: [''],
        salary:[''],
        position:[''],
        website:[''],
        education: this.fb.array([]),
        work: this.fb.array([])
      });
    }
    
    ngOnInit(): void {
      // Check if user is already logged in
      const storedLoginDetails = localStorage.getItem('loginDetails');
      if (storedLoginDetails) {
        this.isLoggedIn = true;
      }
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
  logout() {
  localStorage.removeItem('loginDetails');
  this.isLoggedIn = false;
  this.userIdCounter = 1; // Reset userIdCounter to 1
  this.router.navigate(['/login']); // Navigate to login page after logout
}

    saveFormData() {
      const formData = this.jobApplicationForm.value;
      localStorage.setItem('jobApplicationData', JSON.stringify(formData));
    }
  
    onSubmit() {
      if (this.jobApplicationForm.valid) {
        this.saveFormData();
        alert('Form data saved locally!');
        this.jobApplicationForm.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    }
  
  }
  