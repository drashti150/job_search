import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

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
    console.log('Applying for job: ', job.category);
    job.applied = true;
    this.updateLocalStorage(); // Update local storage after applying for the job

  }

  updateLocalStorage(): void{
  localStorage.setItem('jobPosts', JSON.stringify(this.jobs));
  }
}
