import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetalertService } from '../sweetalert.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  jobApplications: { [key: number]: number[] } = {};
  selectedCountry: string = 'all';
  selectedCategory: string = 'all';
  jobPosts: any[] = [];
  filteredJobPosts: any[] = [];
  recruiters: any;
  categories: any;
  countries: any;

  constructor(private router: Router , private sweetAlertService: SweetalertService) {}

  ngOnInit(): void {
    this.retrieveJobPostsFromLocalStorage();
    this.filterJobPosts();
  }

  retrieveJobPostsFromLocalStorage(): void {
    
    const storedJobPosts = localStorage.getItem('jobPosts');

    if (storedJobPosts) {
      this.jobPosts = JSON.parse(storedJobPosts);
    }

    const storedRecruiters = localStorage.getItem('recruiters');

    if (storedRecruiters) {
      this.recruiters = JSON.parse(storedRecruiters);
    }

    const storedCountries = localStorage.getItem('countries');

    if (storedCountries) {
      this.countries = JSON.parse(storedCountries);
    }

    const storedCategories = localStorage.getItem('categories');

    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    }
  }

  filterJobPosts(): void {

    this.filteredJobPosts = [...this.jobPosts];

    if (this.selectedCountry !== 'all') {
      this.filteredJobPosts = this.filteredJobPosts.filter(job => job.country === this.selectedCountry);
    }

    if (this.selectedCategory !== 'all') {
      this.filteredJobPosts = this.filteredJobPosts.filter(job => job.category === this.selectedCategory);
    }
  }
  
  onSearch(): void {
    this.filterJobPosts();
  }
  // applyForJob(job: any): void {
//     console.log('Applying for job: ', job.category);
//     job.applied = true;

//     // Update jobPosts array
//     const updatedJobPosts = this.jobPosts.map(post => {
//       if (post.id === job.id) {
//         return job;
//       } else {
//         return post;
//       }
//     });

//     localStorage.setItem('jobPosts', JSON.stringify(updatedJobPosts));

//     // Store job application
//     const jobApplications = JSON.parse(localStorage.getItem('jobApplications') || '{}');
//     if (!jobApplications[job.id]) {
//     }

//     jobApplications[1].push(job.id);
//     localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
//   }

//   onSearch(): void {
//     this.filterJobPosts();
//   }
// }
//     applyForJob(job: any): void {
//       console.log('Applying for job: ', job.category);
//       const storedJobApplications = localStorage.getItem('jobApplications');
//       const jobApplications = storedJobApplications ? JSON.parse(storedJobApplications) : {};
//       // const storedLoginDetails = localStorage.getItem('user');
//   // this.jobApplications = storedJobApplications ? JSON.parse(storedJobApplications) : {};
//   if (storedLoginDetails) {
//     const { userId } = JSON.parse(storedLoginDetails);
//     const userAppliedJobs = this.jobApplications[userId] || [];

//     if (userAppliedJobs.includes(job.id)) {
//       // If job is already applied, remove the application
//       const index = userAppliedJobs.indexOf(job.id);
//       if (index !== -1) {
//         userAppliedJobs.splice(index, 1);
//         job.applied = false;
//         this.updateLocalStorage();
//       }
//     } else {
//       userAppliedJobs.push(job.id);
//       job.applied = true;
//       this.jobApplications[userId] = userAppliedJobs;
//       this.updateLocalStorage();
//     }
//   } else {
//     alert('Please login to apply for the job.');
//     this.router.navigate(['/login']);
//   }
// }


applyForJob(job: any): void {
  const storedLoginDetails = localStorage.getItem('user');

  if (storedLoginDetails) {
    const { userId } = JSON.parse(storedLoginDetails);
    const userAppliedJobs = this.jobApplications[1] || [];

    if (userAppliedJobs.includes(job.id)) {
      // If job is already applied, remove the application
      const index = userAppliedJobs.indexOf(job.id);
      if (index !== -1) {
  this.jobApplications[1].push(job.id);

        userAppliedJobs.splice(index, 1);
        job.applied = false;
        this.updateLocalStorage();
      }
    } else {
      userAppliedJobs.push(job.id);
      job.applied = true;
      this.jobApplications[userId] = userAppliedJobs;
      this.updateLocalStorage();
    }
  
  } else {
    // alert('Please login to apply for the job.');
    this.sweetAlertService.showErrorAlert('Oops...', 'Please login to apply for the job.');

    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Please login to apply for the job.'
    // });
    this.router.navigate(['/login']);
  }
}

private updateLocalStorage(): void {
  localStorage.setItem('jobApplications', JSON.stringify(this.jobApplications));
}
}

  //     console.log('Applying for job: ', job.category);
  //     job.applied = true;
  
  //     // Update jobPosts array
  //     const updatedJobPosts = this.jobPosts.map(post => {
  //       if (post.id === job.id) {
  //         return job;
  //       } else {
  //         return post;
  //       }
  //     });
  
  //     localStorage.setItem('jobPosts', JSON.stringify(updatedJobPosts));
  
  //     // Store job application
  //     const jobApplications = JSON.parse(localStorage.getItem('jobApplications') || '{}');
  //     if (!jobApplications[job.id]) {
  //     }
  
  //     jobApplications[1].push(job.id);
  //     localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
  //   }

//   console.log('Applying for job: ', job.category);
//   job.applied = true;

//   // Update jobPosts array
//   const updatedJobPosts = this.jobPosts.map(post => {
//     if (post.id === job.id) {
//       return job;
//     } else {
//       return post;
//     }
//   });

//   localStorage.setItem('jobPosts', JSON.stringify(updatedJobPosts));

//   // Store job application
//   const jobApplications = JSON.parse(localStorage.getItem('jobApplications') || '{}');
//   if (!jobApplications[job.id]) {
//       // jobApplications[job.id] = [];
//   }

//   jobApplications[1].push(job.id); 
//   localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
// }
//   selectedCountry: string = 'all';
//   selectedCategory: string = 'all';
//   jobPosts: any[] = [];
//   filteredJobPosts: any[] = [];
//   recruiters: any;
//   categories: any;
//   countries: any;

//   constructor() { }

//   ngOnInit(): void {
//     this.retrieveJobPostsFromLocalStorage();
//     this.filterJobPosts();
//   }

//   retrieveJobPostsFromLocalStorage(): void {
//     const storedJobPosts = localStorage.getItem('jobPosts');
//     if (storedJobPosts) {
//       this.jobPosts = JSON.parse(storedJobPosts);
//     }

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
//   }

//   filterJobPosts(): void {
//     this.filteredJobPosts = [...this.jobPosts];

//     if (this.selectedCountry !== 'all') {
//       this.filteredJobPosts = this.filteredJobPosts.filter(job => job.country === this.selectedCountry);
//     }

//     if (this.selectedCategory !== 'all') {
//       this.filteredJobPosts = this.filteredJobPosts.filter(job => job.category === this.selectedCategory);
//     }
//   }

//   applyForJob(job: any): void {
//     console.log('Applying for job: ', job.category);
//     job.applied = true;

//     localStorage.setItem('jobPosts', JSON.stringify(this.jobPosts));
//   }

//   onSearch(): void {
//     this.filterJobPosts();
//   }
// }

//   selectedCountry: string = 'all';
//   selectedCategory: string = 'all';
//   jobPosts: any[] = [];
//   filteredJobPosts: any[] = [];
//   recruiters: any;
//   categories: any;
//   countries: any;

//   constructor() { }

//   ngOnInit(): void {
//     this.retrieveJobPostsFromLocalStorage();
//   }

//   retrieveJobPostsFromLocalStorage(): void {

//     const storedJobPosts = localStorage.getItem('jobPosts');
//     if (storedJobPosts) {
//       this.jobPosts = JSON.parse(storedJobPosts);
//     }

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

//   }

//   filterJobPosts(): void {
//     this.filteredJobPosts = [...this.jobPosts];

//     if (this.selectedCountry !== 'all') {
//       this.filteredJobPosts = this.filteredJobPosts.filter(job => job.country === this.selectedCountry);
//     }

//     if (this.selectedCategory !== 'all') {
//       this.filteredJobPosts = this.filteredJobPosts.filter(job => job.category === this.selectedCategory);
//     }

//   }

//   applyForJob(job: any): void {
//     console.log('Applying for job: ', job.category);
//     job.applied = true;

//     localStorage.setItem('jobPosts', JSON.stringify(this.jobPosts));
//   }

// }