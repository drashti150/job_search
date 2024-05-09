import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from '../sweetalert.service';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css']
})
export class ResumesComponent {
  jobApplicationForm: FormGroup;

  constructor(private fb: FormBuilder , private router: Router, private seetAlertService: SweetalertService) {

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
      position: [''],
      salary: [''],
      skills: ['']
    });
  }

  saveFormData() {
    const formData = this.jobApplicationForm.value;

    let userId: number = parseInt(localStorage.getItem('jobApplieduserId') || '0') + 1;

    localStorage.setItem('jobApplieduserId', userId.toString());


    let jobApplicationData: any = JSON.parse(localStorage.getItem('jobApplicationData') || '{}');

    jobApplicationData[userId] = formData;

    localStorage.setItem('jobApplicationData', JSON.stringify(jobApplicationData));
    this.seetAlertService.showSuccessAlert('Success','Form data saved locally!')

    // alert('Form data saved locally!');
    this.jobApplicationForm.reset();
  }

  onSubmit() {
    if (this.jobApplicationForm.valid) {
      this.saveFormData();
      this.router.navigate(['/home']);

    } else {
      this.seetAlertService.showErrorAlert('Oops...','Please fill in all required fields.')
      // alert('Please fill in all required fields.');
    }
  }
}



















//   isLoggedIn = false;
//   loginForm: FormGroup;
//   jobApplicationForm: FormGroup;
//   userIdCounter: number = 1;
//   formData: any;

//   constructor(private fb: FormBuilder, private router: Router) {

//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });

//     this.jobApplicationForm = this.fb.group({
//       fullname: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', Validators.required],
//       address: ['', Validators.required],
//       city: ['', Validators.required],
//       state: ['', Validators.required],
//       zip: ['', Validators.required],
//       resume: ['', Validators.required],
//       message: [''],
//       linkedin: [''],
//       skills: [''],
//       salary: [''],
//       position: [''],
//       website: [''],
//       education: this.fb.array([]),
//       work: this.fb.array([])
//     });
//   }

//   ngOnInit(): void {
//     this.userIdCounter = 1;

//     // Check if user is already logged in
//     const storedLoginDetails = localStorage.getItem('loginDetails');
//     if (storedLoginDetails) {
//       this.isLoggedIn = true;
//     }
//   }

//   // logout() {
//   //   // Store the current user's details before logging out
//   //   this.storeUserDetails();

//   //   // Perform logout actions
//   //   localStorage.removeItem('loginDetails');
//   //   this.isLoggedIn = false;
//   //   // this.router.navigate(['/login']);

//   //   // Reset stored usernames and user IDs
//   //   this.resetStoredUserDetails();
//   // }

//   resetStoredUserDetails() {
//     localStorage.removeItem('storedUserDetails');
//   }


//   // retrieveFormData(): void {
//   //   // Retrieve form data from local storage
//   //   const storedFormData = localStorage.getItem('formData');
//   //   if (storedFormData) {
//   //     this.formData = JSON.parse(storedFormData);
//   //   }
//   // }

//   saveFormData() {
//     const formData = this.jobApplicationForm.value;
//     localStorage.setItem('jobApplicationData', JSON.stringify(formData));
//   }
  
//   onSubmit() {
//     if (this.jobApplicationForm.valid) {
//       this.saveFormData();

//       alert('Form data saved locally!');

//       this.jobApplicationForm.reset();

//       this.router.navigate(['/login']);
//     } else {
//       alert('Please fill in all required fields.');
//     }
//   }


// }