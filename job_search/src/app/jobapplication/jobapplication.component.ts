import { Component } from '@angular/core';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobapplication',
  templateUrl: './jobapplication.component.html',
  styleUrls: ['./jobapplication.component.css']
})
export class JobapplicationComponent {

  jobs: { title: string, description: string, applicants: string  }[];

  constructor( private jobservice: JobService) { 
    // Retrieve jobs from local storage when the service is instantiated
    const storedJobs = localStorage.getItem('jobs');
    this.jobs = storedJobs ? JSON.parse(storedJobs) : [];
  }

  applyForJob(jobIndex: number, applicantName: string) {
    this.jobservice.applyForJob(jobIndex, applicantName);
    localStorage.setItem('jobs', JSON.stringify(this.jobs));
  }
 
  
}
