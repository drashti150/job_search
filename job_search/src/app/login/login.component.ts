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
    // login() {
    //   if (this.loginForm.valid) {
    //     const username = this.loginForm.value.username;
    //     const password = this.loginForm.value.password;
    
    //     let storedLoginDetails = localStorage.getItem('loginDetails');
    //     let userDetailsArray: any[] = [];
    
    //     if (storedLoginDetails) {
    //       // If login details found, parse the stored data into an array
    //       userDetailsArray = JSON.parse(storedLoginDetails);
    //     }
    
    //     // Create new user details
    //     const userId = this.userIdCounter ++;
    //     const userDetails = { username, userId };
    
    //     // Check if userDetailsArray is initialized
    //     if (!Array.isArray(userDetailsArray)) {
    //       userDetailsArray = [];
    //     }
    
    //     // Add the new user details to the array
    //     userDetailsArray.push(userDetails);
    
    //     // Store the updated array in local storage
    //     localStorage.setItem('loginDetails', JSON.stringify(userDetailsArray));
    
    //     // Set isLoggedIn flag to true
    //     this.isLoggedIn = true;
    //   }
    // }
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
          alert('log in Successfully.')
          this.router.navigate(['/jobs']);
        } else {
          alert('User is already logged in.');
        }
      }
    }
  
    storeUserDetails(): void {
      // Retrieve the current user details from local storage
      const storedLoginDetails = localStorage.getItem('loginDetails');
      if (storedLoginDetails) {
        const { username, userId } = JSON.parse(storedLoginDetails);
    
        // Retrieve the array of user details from local storage
        const storedUserDetails = localStorage.getItem('storedUserDetails');
        let userDetails: { username: string, userId: number }[] = [];
        if (storedUserDetails) {
          userDetails = JSON.parse(storedUserDetails);
        }
    
        // Add the current user details to the array
        userDetails.push({ username, userId });
    
        // Store the updated array back to local storage
        localStorage.setItem('storedUserDetails', JSON.stringify(userDetails));
      }
    }
    
    getUserIdFromLocalStorage(): number | null {
      const storedLoginDetails = localStorage.getItem('loginDetails');
      if (storedLoginDetails) {
        const userDetailsArray: any[] = JSON.parse(storedLoginDetails);
        // Assuming the user's ID is stored as 'userId' property
        if (userDetailsArray.length > 0) {
          return userDetailsArray[0].userId; // Assuming the first user's ID is needed
        }
      }
      return null; // Return null if login details are not found or user ID is not available
    }
    
  }
     
  //   login() {
  //     if (this.loginForm.valid) {
  //       const username = this.loginForm.value.username;
  //       const password = this.loginForm.value.password;
  
  //       const storedLoginDetails = localStorage.getItem('loginDetails');
  //       if (!storedLoginDetails) {
  //         let userId = 0;
  //         console.log("success")
  //         localStorage.setItem('loginDetails', JSON.stringify({ username, userId }));
  //         this.isLoggedIn = true;
  //       } else {
  //         alert('User is already logged in.');
  //       }
  //     }
  //   }
  // }
  