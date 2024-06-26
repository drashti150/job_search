import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetalertService } from '../sweetalert.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private router: Router,private sweetAlertService: SweetalertService) { }
  jobApplications: { [key: number]: number[] } = {};
  jobs: any[] = [];
  category: string = '';
  companyName: string = '';
  location: string = '';
  description: string = '';
  country: any;
  jobIdCounter: number = 1;
  showDescription: boolean[] = new Array(this.jobs.length).fill(false);
  userId: string = '';


  ngOnInit(): void {
    this.retrieveData();
    this.retrieveJobApplications();
    this.initializeShowDescription();
    this.updateLocalStorage();
    this.updateJobStatus();
  }



  toggleDescription(index: number) {
    this.showDescription[index] = !this.showDescription[index];
  }

  initializeShowDescription(): void {
    this.showDescription = new Array(this.jobs.length).fill(false);
  }

  retrieveData() {
    const storedJobs = localStorage.getItem('jobPosts');
    if (storedJobs) {
      this.jobs = JSON.parse(storedJobs);
    }
  }
 
  retrieveJobApplications(): void {
    const storedJobApplications = localStorage.getItem('jobApplications');
    if (storedJobApplications) {
      this.jobApplications = JSON.parse(storedJobApplications);
    }
  }

  applyOrRedirect(job: any): void {
    const storedLoginDetails = localStorage.getItem('user');

    if (storedLoginDetails) {
      const { userId } = JSON.parse(storedLoginDetails);

      const userAppliedJobs = this.jobApplications[userId] || [];

      if (userAppliedJobs.includes(job.id)) {
        // If job is already applied, remove the application

        const index = userAppliedJobs.indexOf(job.id);
        if (index !== -1) {
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
     this.sweetAlertService.showErrorAlert('Oops...','Please login to apply for the job.')
      this.router.navigate(['/login']);
    }
  }
  
  
updateJobStatus(): void {

  const storedLoginDetails = localStorage.getItem('user');

  if (storedLoginDetails) {
    const { userId } = JSON.parse(storedLoginDetails);
    const userAppliedJobs = this.jobApplications[userId] || [];
    this.jobs.forEach(job => {
      job.applied = userAppliedJobs.includes(job.id);

    });
  }
}

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
      this.updateLocalStorage();
      this.retrieveData();
      this.initializeShowDescription();
    }
  }
  
  updateLocalStorage() {
    
    localStorage.setItem('jobPosts', JSON.stringify(this.jobs));
    localStorage.setItem('jobApplications', JSON.stringify(this.jobApplications));
  }
  
}
 
