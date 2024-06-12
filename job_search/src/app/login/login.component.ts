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
      
        // alert('Email already exists. Please use a different email.');
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
      
      // console.log("Login Successfully.");
      this.router.navigate(['/resumes']);
  
      localStorage.setItem('user', JSON.stringify(this.userDetails));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  

  // logout() {
  //   this.loginForm.reset();
  //   this.isLoggedIn = false;

  //   localStorage.removeItem('user');
  // }
}



  // login() {
  //   if (this.loginForm.valid) {
  //     console.log('Login Form Values:', this.loginForm.value);
  //     this.isLoggedIn = true;

  //     this.lastUserId++;
  //     localStorage.setItem('lastLoginUserId', this.lastUserId.toString());

  //     this.userDetails = {
  //       email: this.loginForm.value.email,
  //       userId: this.lastUserId
  //     };

  //     this.storedUserDetails.push(this.userDetails);
  //     localStorage.setItem('storedUserDetails', JSON.stringify(this.storedUserDetails));

  //     console.log("Login Successfully.")
  //     this.router.navigate(['/resumes']);

  //     localStorage.setItem('user', JSON.stringify(this.userDetails));
  //   } else {
  //     this.loginForm.markAllAsTouched();
  //   }
  //      // Clear input fields after adding job
  //     this.email = '';
  //     this.password = '';
  // }

//   password: string = '';
//   userIdCounter: number = 1;
//   loginForm: any;
//   isLoggedIn = false;

//   userDetails: any = {};

//   lastUserId: number = parseInt(localStorage.getItem('lastLoginUserId') || '0');

// constructor(private fb: FormBuilder ,private router : Router) {
//   this.loginForm = this.fb.group({
//     username: ['', Validators.required],
//     password: ['', Validators.required]
//   });

//   // Check if user is already logged in on component initialization
//   const user = localStorage.getItem('user');
//   if (user) {
//     this.userDetails = JSON.parse(user);
//     this.isLoggedIn = true;
//   }
// }

// // login() {
 
// //   console.log('Login Form Values:', this.loginForm.value);
// //   this.isLoggedIn = true;

// //   this.lastUserId++;
// //   localStorage.setItem('lastUserId', this.lastUserId.toString());

// //   this.userDetails = {
// //     username: this.loginForm.value.username,
// //     userId: this.lastUserId
// //   };
// //   console.log("Login Successfully.")
// //   this.router.navigate(['/jobs']);

// //   localStorage.setItem('user', JSON.stringify(this.userDetails));
// // }

// login() {
//   if (this.loginForm.valid) {

//     console.log('Login Form Values:', this.loginForm.value);
//     this.isLoggedIn = true;

//     this.lastUserId++;
//     localStorage.setItem('lastLoginUserId', this.lastUserId.toString());

//     this.userDetails = {
//       username: this.loginForm.value.username,
//       userId: this.lastUserId
//     };

//     console.log("Login Successfully.")
//     this.router.navigate(['/jobs']);

//     localStorage.setItem('user', JSON.stringify(this.userDetails));
//   } else {
//     this.loginForm.markAllAsTouched();
//   }
// }

// logout() {
//   this.loginForm.reset();
//   this.isLoggedIn = false;

//   localStorage.removeItem('user');
// }
// }

// constructor(private fb: FormBuilder, private router: Router) {
//   this.loginForm = this.fb.group({
//     username: ['', Validators.required],
//     password: ['', Validators.required]
//   });

//   // Check if user is already logged in on component initialization
//   const user = localStorage.getItem('user');
//   if (user) {
//     this.userDetails = JSON.parse(user);
//     this.isLoggedIn = true;
//   }
// }

// login() {
//   if (this.loginForm.valid) {
//     console.log('Login Form Values:', this.loginForm.value);
//     this.isLoggedIn = true;

//     this.lastUserId++;
//     localStorage.setItem('lastUserId', this.lastUserId.toString());

//     this.userDetails = {
//       username: this.loginForm.value.username,
//       userId: this.lastUserId
//     };

//     console.log("Login Successfully.")
//     this.router.navigate(['/jobs']);

//     localStorage.setItem('user', JSON.stringify(this.userDetails));
//   } else {
//     this.loginForm.markAllAsTouched();
//   }
// }

// logout() {
//   this.loginForm.reset();
//   this.isLoggedIn = false;

//   localStorage.removeItem('user');
// }



  // constructor(private fb: FormBuilder, private router: Router) {

  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

//   login() {
//     if (this.loginForm.valid) {
//       const username = this.loginForm.value.username;
//       const password = this.loginForm.value.password;

//       // Check if user is already logged in
//       const storedLoginDetails = localStorage.getItem('loginDetail');
//       if (storedLoginDetails) {

//         const userId = this.userIdCounter++;
//         localStorage.setItem('loginDetail', JSON.stringify({ username, userId }));

//         this.isLoggedIn = true;
//         alert('log in Successfully.');

//         this.router.navigate(['/jobs']);

//       } else {
//         alert('User is already logged in.');
//       }
//     }
//   }

//   storeUserDetails(): void {

//     const storedLoginDetails = localStorage.getItem('loginDetail');
//     if (storedLoginDetails) {
//       const { username, userId } = JSON.parse(storedLoginDetails);

//       const storedUserDetails = localStorage.getItem('storedUserDetails');
//       let userDetails: { username: string, userId: number }[] = [];
//       if (storedUserDetails) {
//         userDetails = JSON.parse(storedUserDetails);
//       }

//       // Add the current user details to the array
//       userDetails.push({ username, userId });
    
//       localStorage.setItem('storedUserDetails', JSON.stringify(userDetails));
//     }
//   }
  
//   getUserIdFromLocalStorage(): number | null {
//     const storedLoginDetails = localStorage.getItem('loginDetail');
//     if (storedLoginDetails) {
//       const userDetailsArray = JSON.parse(storedLoginDetails);

//       if (userDetailsArray.length > 0) {
//         return userDetailsArray[0].userId;
//       }
//     }
//     return null;
//   }
//   logout() {
//     // Implement your logout logic, such as clearing form fields or any other necessary tasks
//     console.log("Logged out");
//     this.loginForm.reset(); // Reset the form fields
//   }
// }
