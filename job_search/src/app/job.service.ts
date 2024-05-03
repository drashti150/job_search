import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService { 
private jobs: { title: string, description: string, applicants: string[] }[] = [];

constructor() { 
  // Retrieve jobs from local storage when the service is instantiated
  const storedJobs = localStorage.getItem('jobs');
    this.jobs = storedJobs ? JSON.parse(storedJobs) : [];
  }

  postJob(title: string, description: string) {
    this.jobs.push({ title, description, applicants: [] });
    this.saveJobsToLocalStorage();
  }

  applyForJob(jobIndex: number, applicantName: string) {
    this.jobs[jobIndex].applicants.push(applicantName);
    this.saveJobsToLocalStorage();
  }

  private saveJobsToLocalStorage() {
    localStorage.setItem('jobs', JSON.stringify(this.jobs));
  }

  getJobs() {
    return this.jobs;
  }

 
  getUserAppliedJobs() {
    throw new Error('Method not implemented.');
  }
 
  
  isLoggedIn = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}