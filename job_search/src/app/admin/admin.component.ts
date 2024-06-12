import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetalertService } from '../sweetalert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isLoggedIn: boolean = false;
  loginForm: FormGroup;
  showRecruitersPanel: boolean = false;
  showRightPanel: boolean = false;
  jobApplications: any;
  recruiterForm: FormGroup | undefined;
  recruiterName: any = '';
  recruiterEmail: any = '';
  recruiterCategory: any = '';
  recruiters: { blocked: any;name: string, email: string, category: string}[] = [];
  editingIndex: number | null = null;
  index: any = '';
  isEditing: any = '';
  showCategoryPanel: boolean = false;
  selectedRecruiterName: string ='';
  selectedRecruiterCategory: string = '';
  recruiter: any;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showchangePassword: boolean = false;

  
  constructor(private formBuilder: FormBuilder,  private sweetAlertService: SweetalertService) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

    ngOnInit() {
      this.retrieveData();
      }

      login() {
        if (this.loginForm.valid) {
          const username = this.loginForm.value.username;
          const password = this.loginForm.value.password;
      
          if (username.trim() === 'admin' && password.trim() === '1234') {

            this.sweetAlertService.showSuccessAlert('Success..','Login Successfully.');

            this.isLoggedIn = true;

          } else {

            this.sweetAlertService.showErrorAlert('Oops...','Invalid username or password.');
           
          }      
          this.loginForm.reset();
        } else {
          this.loginForm.markAllAsTouched();
        }
      }
      
  togglePanel(showRecruiters: boolean, changePassword: boolean) {
    this.showRecruitersPanel = showRecruiters;
    this.showchangePassword = changePassword;
    this.resetFields();
  }

  toggleRecruiters() {
    this.togglePanel(true , false);
  }

  togglePassword() {
    this.togglePanel(false ,true);
  }

  resetFields() {
    this.recruiterName = '';
    this.recruiterEmail = '';
    this.recruiterCategory = '';
  }

  editRecruiter(index: number) {
    this.editingIndex = index;

    const recruiter = this.recruiters[index];

    // Check if the recruiter is found
    if (recruiter) {
      this.recruiterName = recruiter.name;
      this.recruiterEmail = recruiter.email;
      this.recruiterCategory = recruiter.category;

      this.isEditing = true;

    } else {
      this.sweetAlertService.showErrorAlert('Oops...','Recruiter not Found.');
    }
  }

  updateRecruiter() {
    if (this.editingIndex === null) {
      alert("Index is null.");
      return;
    }
  
    const recruiter = this.recruiters[this.editingIndex];
  
    if (recruiter.blocked) {
      // alert("Recruiter is blocked. Cannot update details.");
      this.sweetAlertService.showErrorAlert('Oops...','Recruiter is blocked. Cannot update details.');
      return;
    }
  
    recruiter.name = this.recruiterName;
    recruiter.email = this.recruiterEmail;
    recruiter.category = this.recruiterCategory;
  
    this.storeData();
  
    this.resetFields();
  
    // Set editingIndex to null to indicate we are no longer editing
    this.editingIndex = null;
  }
 
    async deleteRecruiter(index: number) {
      const confirmed = this.sweetAlertService.showConfirmationDialog(
        'Delete for Job',
        'Are you sure you want to delete this job?'
      );
    
      if (await confirmed) {
        this.recruiters.splice(index, 1);
      } else {
        console.log('Deletion cancelled by user.');
      }
    this.storeData();

    }
    

  retrieveData() {
  
    const storedRecruiters = localStorage.getItem('recruiters');
    if (storedRecruiters) {
      this.recruiters = JSON.parse(storedRecruiters);
    }
  }

  storeData() {
    localStorage.setItem('recruiters', JSON.stringify(this.recruiters));   
  }

  retrieveJobApplications(): void {
    const storedJobApplications = localStorage.getItem('jobApplications');
    if (storedJobApplications) {
      this.jobApplications = JSON.parse(storedJobApplications);
    }
  }
   
  blockRecruiter(recruiter: any) {
        recruiter.blocked = !recruiter.blocked;
        this.storeData(); 
}

  addRecruiter() {
    if (this.recruiterName && this.recruiterEmail && this.recruiterCategory) {
      // Check if the recruiter already exists
      const existingRecruiter = this.recruiters.find(recruiter => recruiter.email === this.recruiterEmail);
      if (existingRecruiter) {
        // alert("Recruiter with the same email already exists.");      
        this.sweetAlertService.showErrorAlert('Oops...','Recruiter with the same email already exists.');

        return;
      }
  
      // Add the new recruiter
      this.recruiters.push({
        name: this.recruiterName,
        email: this.recruiterEmail,
        category: this.recruiterCategory,
        blocked: undefined
      });
  
      this.storeData(); 
      this.resetFields(); // Reset input fields
    }
  }
  changePassword() {
    var email = prompt("Please enter your email address to reset your password:");
  
    if (email) {
      var newPassword = this.generateNewPassword();
  
      localStorage.setItem('password', newPassword);
      localStorage.setItem('email', email);
  
      alert("Password reset instructions have been sent to: " + email);
    } else {
      alert("Password reset canceled.");
      return; // Exit function if email is not provided
    }
  
    // Check if new password matches confirm password
    if (this.newPassword === this.confirmPassword) {
      // Passwords match, proceed with password change
      this.sweetAlertService.showSuccessAlert('Success','Password changed successfully.');
      
      // Reset form fields
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    } else {
      // Passwords do not match
      console.log('New password and confirm password do not match.');
      // Optionally, you can show an error message to the user
    }
  }
  
  
  generateNewPassword() {
    var newPassword = Math.random().toString(36).slice(-8); 
    return newPassword;
  }
  
}



  // addRecruiter() {
  //   if (this.recruiterName && this.recruiterEmail && this.recruiterCategory) {
  //     this.recruiters.push({
  //       name: this.recruiterName,
  //       email: this.recruiterEmail,
  //       category: this.recruiterCategory
  //     });

  //     this.storeData();

  //     this.resetFields();
  //   }
  // }
  // updateRecruiter() {
  //   if (this.index === null) {
  //     alert("Index is null.");
  //     return;
  //   }

  //   const recruiter = this.recruiters[this.index];

  //   recruiter.name = this.recruiterName;
  //   recruiter.email = this.recruiterEmail;
  //   recruiter.category = this.recruiterCategory;

  //   this.storeData();

  //   this.resetFields();
  // }
  // updateRecruiter() {
  //   if (this.editingIndex === null) {
  //     alert("Index is null.");
  //     return;
  //   }
  
  //   const recruiter = this.recruiters[this.editingIndex];
  
  //   if (!recruiter) {
  //     console.error('Recruiter not found!');
  //     return;
  //   }
  
  //   recruiter.name = this.recruiterName;
  //   recruiter.email = this.recruiterEmail;
  //   recruiter.category = this.recruiterCategory;
  
  //   this.storeData();
  
  //   this.resetFields();
  // }
//   isLoggedIn: boolean = false;
//   loginForm: FormGroup;
//   showRecruitersPanel: boolean = false;
//   showCategoriesPanel: boolean = false;
//   selectedJob: any;
//   showRightPanel: boolean = false;
//   selectedJobIndex: number | null = null;
//   showJobList: boolean = false;
//   jobs: any;
//   editingCategoryIndex: number | null = null;
//   category: any;
//   countryName: any;
//   companyName: any;
//   jobIdCounter: number = 1;
//   jobApplications: any;
//   description: any;
//   location: any;
//   selectedCategory: any;
//   recruiterForm: FormGroup | undefined;
//   recruiterName: any = '';
//   recruiterEmail: any = '';
//   recruiterCategory: any = '';
//   recruiters: {  appliedCategories: any; name: string, email: string, category: string }[] = [];
//   editingIndex: number | null = null;
//   index: any = '';
//   isEditing: any = '';
//   showCategoryPanel: boolean = false;
//     selectedRecruiterName: string ='';
//     selectedRecruiterCategory: string = '';
//     recruiterCategories: string = ''; // Assuming recruiterCategories is an array of strings
// recruiter: any;
    
  
//   constructor(private formBuilder: FormBuilder) {

//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]

//     });
//   }

//   ngOnInit() {
//     // Set ids for job posts
//     this.jobPosts.forEach(job => {
//       job.id = this.jobIdCounter++;
//     });
  
  
//       // Set ids for job posts
//       // this.jobPosts.forEach((job, index) => {
//       //   job.id = index + 1;
//       // });
//      this.retrieveData();
//       const storedCounter = localStorage.getItem('jobIdCounter');
//       this.jobIdCounter = storedCounter ? parseInt(storedCounter, 10) : 1;
//     }
    
//     // this.retrieveJobApplication();
  
  
//   login() {

//     if (this.loginForm.valid) {

//       const username = this.loginForm.value.username;
//       const password = this.loginForm.value.password;

//       if (username === 'admin' && password === 'password') {
//         alert('Login successful');
//         this.isLoggedIn = true;
//       } else {
//         alert('Invalid username or password');
//       }

//       this.loginForm.reset();
//     } else {
//       this.loginForm.markAllAsTouched();
//     }
//   }

//   togglePanel(showRecruiters: boolean, showCategories: boolean, showJobList: boolean) {
//     this.showRecruitersPanel = showRecruiters;
//     this.showCategoriesPanel = showCategories;
//     this.showJobList = showJobList;
//     this.resetFields();
//   }

//   toggleRecruiters() {
//     this.togglePanel(true, false, false);
//   }

//   toggleCategories() {
//     this.togglePanel(false, true, false);
//   }

//   toggleJobList() {
//     this.togglePanel(false, false, true);
//   }

//   resetFields() {
//     this.recruiterName = '';
//     this.recruiterEmail = '';
//     this.recruiterCategory = '';
//   }

//   getRecruitersByCategory(category: string) {
//     return this.recruiters.filter(recruiter => recruiter.appliedCategories.includes(category));
//   }
//   addJob() {
//     if (this.category && this.countryName && this.companyName && this.location && this.description) {
//       // Pass the selected recruiter's name when adding a new job post
//       this.addJobPost({
//         category: this.category,
//         country: this.countryName,
//         company: this.companyName,
//         location: this.location,
//         description: this.description,
//       }, this.selectedRecruiterName);
  
//       // Clear input fields after adding job
//       this.category = '';
//       this.countryName = '';
//       this.companyName = '';
//       this.location = '';
//       this.description = '';
//     }
//   }
//    toggleCategoryPanel() {
//     this.showCategoryPanel = !this.showCategoryPanel;
//   }

//   editRecruiter(index: number) {
//     this.editingIndex = index;

//     const recruiter = this.recruiters[index];

//     // Check if the recruiter is found
//     if (recruiter) {
//       this.recruiterName = recruiter.name;
//       this.recruiterEmail = recruiter.email;
//       this.recruiterCategory = recruiter.category;

//       this.isEditing = true;

//     } else {
//       console.error('Recruiter not found!');
//     }
//   }

//   updateRecruiter() {
//     if (this.index === null) {
//       alert("Index is null.");
//       return;
//     }

//     const recruiter = this.recruiters[this.index];

//     recruiter.name = this.recruiterName;
//     recruiter.email = this.recruiterEmail;
//     recruiter.category = this.recruiterCategory;

//     this.storeData();

//     this.resetFields();
//   }

//   deleteRecruiter(index: number) {
//     this.recruiters.splice(index, 1);

//     this.storeData();
//   }

//   deleteCategory(index: number) {
//     this.categories.splice(index, 1);

//     this.storeData();

//     // this.resetCategoryFields();
//   }

//   resetCategoryFields() {
//     this.category = '';
//     this.editingCategoryIndex = null;
//   }

//   retrieveData() {
  
//     const storedRecruiters = localStorage.getItem('recruiters');
//     if (storedRecruiters) {
//       this.recruiters = JSON.parse(storedRecruiters);
//     }

//     const storedCountries = localStorage.getItem('countries');
//     if (storedCountries) {
//       this.countries = JSON.parse(storedCountries);
//     }

//     const storedCategories = localStorage.getItem('categories');
//     if (storedCategories) {
//       this.categories = JSON.parse(storedCategories);
//     }

//     const storedJobs = localStorage.getItem('jobPosts');
//     if (storedJobs) {
//       this.jobs = JSON.parse(storedJobs);
//     }
//   }


//   filterByCategory(): void {
//     const selectedCategory = (document.getElementById('category-list') as HTMLSelectElement).value;
//     if (selectedCategory === 'all') {
//       console.log('Filtering job listings by all categories');
//     } else {
//       console.log('Filtering job listings by category:', selectedCategory);
//     }
//   }

//   // // job post
//   categories = [
//     "Flutter",
//     "Web developer",
//     "Web design",
//     "Marketing",
//     "UI/UX Designer",
//   ];

//   countries = [
//     "Gujarat",
//     "Jaipur",
//     "Kolkata",
//     "Bangalore",
//     "Mumbai",

//   ];

//   jobPosts: any[] = [
//     {"id": 1,
//       "title": 'UI/UX Designer',
//       "company": 'Company ABC',
//       "location": 'Location X',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Gujarat',
//       "category": 'Flutter'
//     }, 
//     {"id": 2,
//       "title": 'UI/UX Designer',
//       "company": 'Company XYZ',
//       "location": 'Location X',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Gujarat',
//       "category": 'UI/UX Designer'
//   }, 
//     {"id": 3,
//     "title": 'UI/UX Designer',
//       "company": 'Company DEF',
//       "location": 'Location X',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Gujarat',
//       "category": 'Web design'
//     }, 
//     {"id": 4,
//       "title": 'UI/UX Designer',
//       "company": 'Company ABCD',
//       "location": 'Location X',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Gujarat',
//       "category": 'Web developer'
//     }, 
//     {"id": 5,
//       "title": 'UI/UX Designer',
//       "company": 'Company EFG',
//       "location": 'Location X',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Gujarat',
//       "category": 'Marketing'
//     }, 
//     {"id": 6,
//       "title": 'UI/UX Designer',
//       "company": 'Company A',
//       "location": 'Location X',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Jaipur',
//       "category": 'UI/UX Designer'
//     },
//     {"id": 7,
//       "title": "UI/UX Designer",
//       "company": "Design Co.",
//       "location": "Sarthana",
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "category": "UI/UX Designer",
//       "country": 'Mumbai'

//     }, 
//     {"id": 8,
//       "title": 'UI/UX Designer',
//       "company": 'Company ABC',
//       "location": 'Location X',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Mumbai',
//       "category": 'UI/UX Designer'
//     },
//     {"id": 9,
//       "title": 'UI/UX Designer',
//       "company": 'system',
//       "location": 'Location X',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Kolkata',
//       "category": 'UI/UX Designer'
//     },
//     {"id": 10,
//       "title": 'UI/UX Designer',
//       "company": 'Company A',
//       "location": 'Location X',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Bangalore',
//       "category": 'UI/UX Designer'
//     },
//     {"id": 11,
//       "title": "Flutter",
//       "company": "Data Insights Inc.",
//       "location": "Motavarachha",
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "category": "Flutter",
//       "country": 'Jaipur'

//     },
//     {"id": 12,
//       "title": "Flutter",
//       "company": "Data Insights Inc.",
//       "location": "Motavarachha",
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "category": "Flutter",
//       "country": 'Mumbai'

//     },
//     {"id": 13,
//       "title": "Flutter",
//       "company": "Data Insights Inc.",
//       "location": "Motavarachha",
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "category": "Flutter",
//       "country": 'Kolkata'

//     },
//     {"id": 14,
//       "title": 'Web design',
//       "company": 'xyz',
//       "location": 'Adajan',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Bangalore',
//       "category": 'Web design',

//     },
//     {"id": 15,
//       "title": 'Web developer',
//       "company": 'abc',
//       "location": 'LalDarwaja',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Kolkata',
//       "category": 'Web developer',
//     },
//     {"id": 16,
//       "title": 'Web developer',
//       "company": 'abcd',
//       "location": 'Varachha',
//       "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//       "country": 'Mumbai',
//       "category": 'Web developer',
//     }

//   ];


//   // addJobPost(job: any) {
//   //   job.id = this.jobIdCounter++;
//   //   this.jobPosts.push(job);
//   //   this.storeData();
//   // }
  
//   // addJobPost(job: any) {
//   //   job.id = this.jobIdCounter;
//   //   this.jobIdCounter++; // Increment the counter after assigning the ID
//   //   this.jobPosts.push(job);
//   //   this.storeData();
//   // }
//   addJobPost(job: any, category: string) {
//     // Find the recruiter by category
//     const recruiter = this.recruiters.find(recruiter => recruiter.category === category);
//     if (recruiter) {
//       // Use the recruiter's name for the job post
//       job.recruiterName = recruiter.name;
//     }
//     job.id = this.jobIdCounter;
//     this.jobIdCounter++; // Increment the counter after assigning the ID
//     this.jobPosts.push(job);
//     this.storeData();
//   }
  
//   deleteJob(index: number) {
//     this.jobPosts.splice(index, 1);

//     this.storeData();
//   }

//   storeData() {
//     localStorage.setItem('recruiters', JSON.stringify(this.recruiters));
//     localStorage.setItem('countries', JSON.stringify(this.countries));
//     localStorage.setItem('categories', JSON.stringify(this.categories));
//     localStorage.setItem('jobPosts', JSON.stringify(this.jobPosts));
//   }

//   retrieveJobApplications(): void {
//     const storedJobApplications = localStorage.getItem('jobApplications');
//     if (storedJobApplications) {
//       this.jobApplications = JSON.parse(storedJobApplications);
//     }
//   }
 

//   // Method to add a new recruiter
//   addRecruiter() {
//     if (this.recruiterName && this.recruiterEmail && this.recruiterCategory) {
//       const existingRecruiter = this.recruiters.find(recruiter => recruiter.name === this.recruiterName);

//       if (existingRecruiter) {
//         // Update the existing recruiter's applied categories
//         if (!existingRecruiter.appliedCategories.includes(this.recruiterCategory)) {
//           existingRecruiter.appliedCategories.push(this.recruiterCategory);
//         }
//       } else {
//         // Add a new recruiter entry
//         this.recruiters.push({
//           name: this.recruiterName,
//           email: this.recruiterEmail,
//           category: this.recruiterCategory,
//           appliedCategories: [this.recruiterCategory] // Initialize applied categories array
//         });
//       }

//       this.storeData();

//       this.resetFields();
//     }
//   }

//   // addRecruiter() {
//   //   if (this.recruiterName && this.recruiterEmail && this.recruiterCategory) {
//   //     this.recruiters.push({
//   //       name: this.recruiterName,
//   //       email: this.recruiterEmail,
//   //       category: this.recruiterCategory
//   //     });

//   //     this.storeData();

//   //     this.resetFields();
//   //   }
//   // }

//   // Method to check if a recruiter has applied in a specific category
//   recruiterAppliedInCategory(recruiterName: string, category: string): boolean {
//     const recruiter = this.recruiters.find(recruiter => recruiter.name === recruiterName);
//     return !!recruiter && recruiter.appliedCategories.includes(category);

//   // Other methods...
// }
// }


//   // toggleJobList(): void {
//   //   // if (this.showRightPanel) {
//   //   //   this.showRightPanel = false;
//   //   //   this.selectedJobIndex = null;
//   //   // }
//   //   this.showJobList = !this.showJobList;
//   // }
// // ngOnInit() {
//   // this.retrieveData(); // Retrieve existing job posts from localStorage
//   // // Initialize jobIdCounter to one more than the highest existing ID, or 1 if there are no existing job posts
//   // this.jobIdCounter = this.jobPosts.length > 0 ? Math.max(...this.jobPosts.map(job => job.id)) + 1 : 1;
// // }


//     // retrieveJobPosts() {
//     //   const storedJobPosts = localStorage.getItem('jobPosts');
//     //   if (storedJobPosts) {
//     //     this.jobPosts = JSON.parse(storedJobPosts);
//     //   }
//     // }
  
//   // category
//   // 
//   // categoryName: any = '';

//   // addCategory() {
//   //   if (this.categoryName.trim() !== '') {
//   //     this.categories.push({ name: this.categoryName });

//   //     this.storeData();

//   //     this.resetCategoryFields();
//   //   }
//   // }

//   // editCategory(index: number) {
//   //   this.editingCategoryIndex = index;
//   //   this.categoryName = this.categories[index].name;
//   // }

//   // updateCategory() {
//   //   if (this.editingCategoryIndex !== null) {
//   //     this.categories[this.editingCategoryIndex].name = this.categoryName;

//   //     this.storeData();

//   //     this.resetCategoryFields();
//   //   }
//   // }
//   // for job
//   // jobs: any[] = [];
//   // category: string = '';
//   // companyName: string = '';
//   // location: string = '';
//   // description: string = '';
//   // countryName: any;
//   // country: any;

//   // addJob() {
//   //   if (this.category && this.countryName && this.companyName && this.location && this.description) {
//   //     // Add new job to the list
//   //     this.jobs.push({
//   //       category:this.category,
//   //       country : this.countryName,
//   //       company: this.companyName,
//   //       location: this.location,
//   //       description: this.description,

//   //     });

//   //     // Save updated job list to local storage
//   //     localStorage.setItem('jobs', JSON.stringify(this.jobs));

//   //     // Clear input fields after adding job
//   //     this.category = '';
//   //     this.countryName = '';
//   //     this.companyName = '';
//   //     this.location = '';
//   //     this.description = '';

//   //   }
//   // }