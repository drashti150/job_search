import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JobService } from '../job.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
//   userEmail: string = '';
//   category: string = '';
//   applications: any[] = [];

//   constructor() {
   
//   }

//   getUserApplicationsByCategory() {
//     if (this.userEmail && this.category) {
//       if (this.applications !== null) {
//         // Filter applications by category
//         this.applications = this.applications.filter(app => app.category === this.category);
//         console.log(this.applications); // Output filtered applications to console
//       } else {
//         console.warn('No job applications found for the user');
//       }
//     } else {
//       console.error('User email and category are required.');
//     }
//   }

// }
title: string = '';
description: string = '';

constructor(private jobService: JobService) { }

postJob() {
  // this.jobService.postJob(this.title, this.description);
    
  // Store the jobs in localStorage
  localStorage.setItem('jobs', JSON.stringify(this.jobService.getJobs()));

  this.jobService.postJob(this.title, this.description);
  this.title = '';
  this.description = '';
}
}