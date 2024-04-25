import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private router: Router) { }
  jobApplications: { [key: number]: number[] } = {};
  jobs: any[] = [];
  category: string = '';
  companyName: string = '';
  location: string = '';
  description: string = '';
  country: any;
  jobIdCounter: number = 1;
  showDescription: boolean[] = new Array(this.jobs.length).fill(false);

  applyOrRedirect(job: any): void {
    const storedLoginDetails = localStorage.getItem('loginDetails');

    if (storedLoginDetails) {
      const { userId } = JSON.parse(storedLoginDetails);

      if (!this.jobApplications[userId]) {
        this.jobApplications[userId] = [];
      }

      this.jobApplications[userId].push(job.id);
      job.applied = true;
      this.updateLocalStorage();

    } else {
      alert('Please login to apply for the job.');
      this.router.navigate(['/resumes']);
    }
  }


  // retrieveData() {
  //   const storedJobs = localStorage.getItem('jobPosts');
  //   if (storedJobs) {
  //     this.jobs = JSON.parse(storedJobs);
  //   }
  // }

  // updateLocalStorage(): void {
  //   localStorage.setItem('jobApplications', JSON.stringify(this.jobApplications));
  // }

  // retrieveJobApplications(): void {
  //   const storedJobApplications = localStorage.getItem('jobApplications');
  //   if (storedJobApplications) {
  //     this.jobApplications = JSON.parse(storedJobApplications);
  //   }
  // }


  // ngOnInit() {
  //   this.retrieveData();
  //   this.retrieveJobApplications();

  //   const storedLoginDetails = localStorage.getItem('loginDetails');
  //   if (storedLoginDetails) {
  //     const { userId } = JSON.parse(storedLoginDetails);
  //     const userApplications = this.jobApplications[userId];

  //     if (userApplications) {
  //       for (const jobId of userApplications) {
  //         const job = this.jobs.find(j => j.id === jobId);
  //         if (job) {
  //           job.applied = true;
  //         }
  //       }
  //     }

  //   }
  // }

  // toggleDescription(index: number) {
  //   this.showDescription[index] = !this.showDescription[index];
  // }

  ngOnInit() {
    this.retrieveData();
    this.retrieveJobApplications();
    this.initializeShowDescription();
  }

  initializeShowDescription(): void {
    this.showDescription = new Array(this.jobs.length).fill(false);
  }

  // applyOrRedirect(job: any): void {
  //   const storedLoginDetails = localStorage.getItem('loginDetails');

  //   if (storedLoginDetails) {
  //     const { userId } = JSON.parse(storedLoginDetails);

  //     if (!this.jobApplications[userId]) {
  //       this.jobApplications[userId] = [];
  //     }

  //     this.jobApplications[userId].push(job.id);
  //     job.applied = true;
  //     this.updateLocalStorage();

  //   } else {
  //     alert('Please login to apply for the job.');
  //     this.router.navigate(['/resumes']);
  //   }
  // }
  // applyOrRedirect(jobIndex: number): void {
  //   const storedLoginDetails = localStorage.getItem('loginDetails');
  
  //   if (storedLoginDetails) {
  //     const { userId } = JSON.parse(storedLoginDetails);
  
  //     if (!this.jobApplications[userId]) {
  //       this.jobApplications[userId] = [];
  //     }
  
  //     // Check if the job index is not already in the user's application list
  //     if (!this.jobApplications[userId].includes(jobIndex)) {
  //       this.jobApplications[userId].push(jobIndex);
  //       this.updateLocalStorage();
  //     } else {
  //       alert('You have already applied for this job.');
  //     }
  //   } else {
  //     alert('Please login to apply for the job.');
  //     this.router.navigate(['/resumes']);
  //   }
  // } ridht 

  addJob() {
    if (this.category && this.companyName && this.location && this.description) {
      const newJob = {
        id: this.jobIdCounter++,
        category: this.category,
        country: this.country,
        company: this.companyName,
        location: this.location,
        description: this.description,
        applied: false
      };
  
      this.jobs.push(newJob);
  
      localStorage.setItem('jobPosts', JSON.stringify(this.jobs));
      this.retrieveData(); 
      this.initializeShowDescription(); 
    }
  }
  
  // retrieveData() {
  //   const storedJobs = localStorage.getItem('jobPosts');
  //   if (storedJobs) {
  //     this.jobs = JSON.parse(storedJobs);
  //   }
  // }
  retrieveData() {
    const storedJobs = localStorage.getItem('jobPosts');
    if (storedJobs) {
      this.jobs = JSON.parse(storedJobs);
      // Extract job IDs and store them in an array
      const jobIds = this.jobs.map(job => job.id);
      console.log('Job IDs:', jobIds); // This will log the array of job IDs
    }
  }
  
  updateLocalStorage(): void {
    localStorage.setItem('jobApplications', JSON.stringify(this.jobApplications));
  }

  retrieveJobApplications(): void {
    const storedJobApplications = localStorage.getItem('jobApplications');
    if (storedJobApplications) {
      this.jobApplications = JSON.parse(storedJobApplications);
    }
  }

  toggleDescription(index: number) {
    this.showDescription[index] = !this.showDescription[index];
  }
}
