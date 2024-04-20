import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobApplications: { [key: number]: number[] } = {}; 
  jobs: any[] = [];
  category: string = '';
  companyName: string = '';
  location: string = '';
  description: string = '';
  country: any;

  ngOnInit() {
    this.retrieveData();
  }

  showDescription: boolean[] = new Array(this.jobs.length).fill(false);

  toggleDescription(index: number) {
    this.showDescription[index] = !this.showDescription[index];
  }
  addJob() {
    if (this.category && this.companyName && this.location && this.description) {
      this.jobs.push({
        category: this.category,
        country: this.country,
        company: this.companyName,
        location: this.location,
        description: this.description,
      });

      // Save updated job list to local storage
      localStorage.setItem('jobPosts', JSON.stringify(this.jobs));
      this.retrieveData();
    }
  }

  retrieveData() {
    const storedJobs = localStorage.getItem('jobPosts');
    if (storedJobs) {
      this.jobs = JSON.parse(storedJobs);
    }
  }

  
  applyForJob(job: any): void {
    const storedLoginDetails = localStorage.getItem('loginDetails');
    if (storedLoginDetails) {
      const { userId } = JSON.parse(storedLoginDetails);
      console.log('User ID:', userId);

      // Check if jobApplications object already contains the key for this job ID
      if (this.jobApplications[job.id]) {
        // If the job ID exists, push the user ID to the array
        this.jobApplications[job.id].push(userId);
      } else {
        // If the job ID does not exist, create a new array with the user ID
        this.jobApplications[job.id] = [userId];
      }

      job.applied = true;
      this.updateLocalStorage(); // Update local storage after applying for the job
    } else {
      console.log('User is not logged in.');
    }
  }

  updateLocalStorage(): void {
    localStorage.setItem('jobPosts', JSON.stringify(this.jobs));
    localStorage.setItem('jobApplications', JSON.stringify(this.jobApplications));
  }

}









