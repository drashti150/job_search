import { Component } from '@angular/core';



// interface Job {
//   title: string;
//   company: string;
//   location: string;
//   description: string;
//   showDetails: boolean;
// }


@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})

export class JobListingComponent {
}
//   jobListings = {
//     "I.T.": [
//       {
//         "title": "Frontend Developer",
//         "company": "ABC Tech",
//         "location": "New York, NY",
//         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//         "showDetails": false
//       },
//       {
//         "title": "Backend Developer",
//         "company": "XYZ Solutions",
//         "location": "San Francisco, CA",
//         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//         "showDetails": false
//       }
//     ],
//     "Sales": [
//       {
//         "title": "UI/UX Designer",
//         "company": "Design Co.",
//         "location": "Seattle, WA",
//         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//         "showDetails": false
//       },
//       {
//         "title": "Project Manager",
//         "company": "Project Management Group",
//         "location": "Boston, MA",
//         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//         "showDetails": false
//       }
//     ],
//     "Education": [
//       {
//         "title": "Data Scientist",
//         "company": "Data Insights Inc.",
//         "location": "Chicago, IL",
//         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
//         "showDetails": false
//       }
//     ]
//   };

//   flattenedJobs: Job[] = [];
//   categories: string[] = Object.keys(this.jobListings);
//   Object: any;
//   category: any;
//   constructor() {
//   }

//   toggleDetails(job: Job): void {
//     job.showDetails = !job.showDetails;
//   }
// }


// import { Component } from '@angular/core';

// interface JobListing {
//   title: string;
//   company: string;
//   location: string;
//   description: string;
//   // category: string;
// }

// interface JobListings {
//   [key: string]: JobListing[];
// }
// @Component({
//   selector: 'app-job-listing',
//   templateUrl: './job-listing.component.html',
//   styleUrls: ['./job-listing.component.css']
// })

// export class JobListingComponent {
// // job: any;
// // ob: any;
// // categories: any;
// // onCategoryChange($event: Event) {
// // throw new Error('Method not implemented.');
// // }


// // jobListings: JobListings = {
 
// //     "I.T.": [
// //       {
// //         "title": "Frontend Developer",
// //         "company": "ABC Tech",
// //         "location": "New York, NY",
// //         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
// //       },
// //       {
// //         "title": "Backend Developer",
// //         "company": "XYZ Solutions",
// //         "location": "San Francisco, CA",
// //         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
// //       }
// //     ],
// //     "Sales": [
// //       {
// //         "title": "UI/UX Designer",
// //         "company": "Design Co.",
// //         "location": "Seattle, WA",
// //         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
// //       },
// //       {
// //         "title": "Project Manager",
// //         "company": "Project Management Group",
// //         "location": "Boston, MA",
// //         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
// //       }
// //     ],
// //     "Education": [
// //       {
// //         "title": "Data Scientist",
// //         "company": "Data Insights Inc.",
// //         "location": "Chicago, IL",
// //         "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
// //       }
// //     ]
// //   };

// //   selectedCategory: string = 'Team';
// //   filteredListings: any[] = this.jobListings['Team'];

// //   constructor() { }

// //   filterByCategory(category: string): void {
// //     this.selectedCategory = category;
// //     this.filteredListings = this.jobListings[category] || [];
// //   }
// }