


import { Component } from '@angular/core';
import { JobService } from '../job.service';

interface Job {
  title: string;
  company: string;
  location: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent {
  // onCategoryChange(arg0: any) {
  // throw new Error('Method not implemented.');
  // }
  //     categories = [
  //       "IT",
  //       "Sales",
  //       "Marketing",
  //       "Finance",
  //       "Design"
  //     ];

  jobListings: { [key: string]: Job[] } = {};
  Object: any;
  selectedCategory: any;

  constructor() { }

  ngOnInit(): void {
    // Merge the categories array with the job listings object
    this.jobListings = {
      "IT": [
        {
          "title": "Frontend Developer",
          "company": "ABC Tech",
          "location": "Nana Varachha",
          "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
          "category": "I.T."
        },
        {
          "title": "Backend Developer",
          "company": "XYZ Solutions",
          "location": "Sahara darwaja",
          "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
          "category": "I.T."
        }
      ],
      "Sales": [
        {
          "title": "UI/UX Designer",
          "company": "Design Co.",
          "location": "Sarthana",
          "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
          "category": "Sales"
        },
        {
          "title": "Data Scientist",
          "company": "Data Insights Inc.",
          "location": "Motavarachha",
          "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
          "category": "Sales"
        }
      ],
      // Add more job listings for other categories
    }
  };
}








// Engineering = {
//   "Engineering": [{
//           "name": "smit",
//           "age": 30,
//           "mobileNo": 1234567890,
//           "salary": 40000
//       },
//       {
//           "name": "Smith",
//           "age": 28,
//           "mobileNo": 9876549210,
//           "salary": 55000
//           }
//   ]
// }
