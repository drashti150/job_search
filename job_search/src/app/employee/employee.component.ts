import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  showCategoriesPanel: boolean = false;
  selectedJob: any;
  showRightPanel: boolean = false;
  selectedJobIndex: number | null = null;
  showJobList: boolean = false;
  jobs: any;
  editingCategoryIndex: number | null = null;
  category: any;
  countryName: any;
  companyName: any;
  jobIdCounter: number = 1;
  jobApplications: any;
  description: any;
  location: any;
  selectedCategory: any;
  editingIndex: number | null = null;
  index: any = '';
  isEditing: any = '';
  showCategoryPanel: boolean = false;
  jobId: string = ''; // Assuming you have a way to get the jobId in your component
  showUserList: boolean = false;

  // ngOnInit() {
  //   // Set ids for job posts
  //   this.jobPosts.forEach((job: { id: number; }) => {
  //     job.id = this.jobIdCounter++;
  //   });
  
  //    this.retrieveData();
  //     // const storedCounter = localStorage.getItem('jobIdCounter');
  //     // this.jobIdCounter = storedCounter ? parseInt(storedCounter, 10) : 1;
  //   }
   
  ngOnInit(): void {
    this.jobPosts.forEach((job: { id: number; }) => {
      job.id = this.jobIdCounter++;
    });
      const storedJobApplications = localStorage.getItem('jobApplications');
      if (storedJobApplications) {
        const parsedData = JSON.parse(storedJobApplications);
      this.jobApplications = JSON.parse(storedJobApplications);

        if (Array.isArray(parsedData)) {
          this.jobApplications = parsedData;
          // If stored data is not an array, handle it accordingly
          console.error('Stored jobApplications data is not an array.');
        }
    }
    
     this.retrieveData();
  }

  viewJobApplications(jobId: string) {
    this.jobId = jobId;
   
    localStorage.setItem('jobApplications', JSON.stringify(this.jobApplications));
  }

  deleteJobApplication(index: number) {
    this.jobApplications.splice(index, 1);
    // Update local storage after deletion
    localStorage.setItem('jobApplications', JSON.stringify(this.jobApplications));
  }

  togglePanel(showCategories: boolean, showJobList: boolean,showUserList: boolean) {
    this.showCategoriesPanel = showCategories;
    this.showJobList = showJobList;
    this.showUserList = showUserList;
  }

  toggleCategories() {
    this.togglePanel(true, false, false);
  }

  toggleJobList() {
    this.togglePanel( false, true, false);
  }
  
  toggleUserList(){
    this.togglePanel( false,false,  true);
  }

   toggleCategoryPanel() {
    this.showCategoryPanel = !this.showCategoryPanel;
  }

  
  retrieveData() {
  
    const storedCountries = localStorage.getItem('countries');
    if (storedCountries) {
      this.countries = JSON.parse(storedCountries);
    }

    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    }

    const storedJobs = localStorage.getItem('jobPosts');
    if (storedJobs) {
      this.jobs = JSON.parse(storedJobs);
    }
  }


  filterByCategory(): void {
    const selectedCategory = (document.getElementById('category-list') as HTMLSelectElement).value;
    if (selectedCategory === 'all') {
      console.log('Filtering job listings by all categories');
    } else {
      console.log('Filtering job listings by category:', selectedCategory);
    }
  }

  // // job post
  categories = [
    "Flutter",
    "Web developer",
    "Web design",
    "Marketing",
    "UI/UX Designer",
  ];

  countries = [
    "Gujarat",
    "Jaipur",
    "Kolkata",
    "Bangalore",
    "Mumbai",

  ];

  jobPosts = [
    {"id": 1,
      "title": 'UI/UX Designer',
      "company": 'Company ABC',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Gujarat',
      "category": 'Flutter'
    }, 
    {"id": 2,
      "title": 'UI/UX Designer',
      "company": 'Company XYZ',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Gujarat',
      "category": 'UI/UX Designer'
  }, 
    {"id": 3,
    "title": 'UI/UX Designer',
      "company": 'Company DEF',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Gujarat',
      "category": 'Web design'
    }, 
    {"id": 4,
      "title": 'UI/UX Designer',
      "company": 'Company ABCD',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Gujarat',
      "category": 'Web developer'
    }, 
    {"id": 5,
      "title": 'UI/UX Designer',
      "company": 'Company EFG',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Gujarat',
      "category": 'Marketing'
    }, 
    {"id": 6,
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Jaipur',
      "category": 'UI/UX Designer'
    },
    {"id": 7,
      "title": "UI/UX Designer",
      "company": "Design Co.",
      "location": "Sarthana",
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "category": "UI/UX Designer",
      "country": 'Mumbai'

    }, 
    {"id": 8,
      "title": 'UI/UX Designer',
      "company": 'Company ABC',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Mumbai',
      "category": 'UI/UX Designer'
    },
    {"id": 9,
      "title": 'UI/UX Designer',
      "company": 'system',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Kolkata',
      "category": 'UI/UX Designer'
    },
    {"id": 10,
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Bangalore',
      "category": 'UI/UX Designer'
    },
    {"id": 11,
      "title": "Flutter",
      "company": "Data Insights Inc.",
      "location": "Motavarachha",
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "category": "Flutter",
      "country": 'Jaipur'

    },
    {"id": 12,
      "title": "Flutter",
      "company": "Data Insights Inc.",
      "location": "Motavarachha",
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "category": "Flutter",
      "country": 'Mumbai'

    },
    {"id": 13,
      "title": "Flutter",
      "company": "Data Insights Inc.",
      "location": "Motavarachha",
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "category": "Flutter",
      "country": 'Kolkata'

    },
    {"id": 14,
      "title": 'Web design',
      "company": 'xyz',
      "location": 'Adajan',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Bangalore',
      "category": 'Web design',

    },
    {"id": 15,
      "title": 'Web developer',
      "company": 'abc',
      "location": 'LalDarwaja',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Kolkata',
      "category": 'Web developer',
    },
    {"id": 16,
      "title": 'Web developer',
      "company": 'abcd',
      "location": 'Varachha',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Mumbai',
      "category": 'Web developer',
    }

  ];

  addJobPost(job: any) {
    job.id = this.jobIdCounter;
    this.jobIdCounter++; // Increment the counter after assigning the ID
    this.jobPosts.push(job);
    this.storeData();
  }
  deleteJob(index: number) {
    this.jobPosts.splice(index, 1);

    this.storeData();
  }

  storeData() {
    localStorage.setItem('countries', JSON.stringify(this.countries));
    localStorage.setItem('categories', JSON.stringify(this.categories));
    localStorage.setItem('jobPosts', JSON.stringify(this.jobPosts));
  }

  retrieveJobApplications(): void {
    const storedJobApplications = localStorage.getItem('jobApplications');
    if (storedJobApplications) {
      this.jobApplications = JSON.parse(storedJobApplications);
    }
  }
}