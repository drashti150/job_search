import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  selectedCountry: string = 'all';
  selectedCategory: string = 'all';
  jobPosts: any[] = [];
  filteredJobPosts: any[] = [];
  recruiters: any;
  categories: any;
  countries: any;

  constructor() { }

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
  applyForJob(job: any): void {
    console.log('Applying for job: ', job.category);
    job.applied = true;

    // Update jobPosts array
    const updatedJobPosts = this.jobPosts.map(post => {
      if (post.id === job.id) {
        return job;
      } else {
        return post;
      }
    });

    localStorage.setItem('jobPosts', JSON.stringify(updatedJobPosts));

    // Store job application
    const jobApplications = JSON.parse(localStorage.getItem('jobApplications') || '{}');
    if (!jobApplications[job.id]) {
    }

    jobApplications[1].push(job.id);
    localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
  }

  onSearch(): void {
    this.filterJobPosts();
  }
}

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