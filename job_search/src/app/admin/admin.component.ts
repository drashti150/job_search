import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isLoggedIn: boolean = false;
  loginForm: FormGroup;
  showRecruitersPanel: boolean = false;
  showCategoriesPanel: boolean = false;
  selectedJob: any;
  showRightPanel: boolean = false;
  selectedJobIndex: number | null = null;
  showJobList: boolean = false;
  jobs: any;
  category: any;
  countryName: any;
  companyName: any;

  constructor(private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }
  ngOnInit() {
    this.retrieveData();
  }
  login() {

    if (this.loginForm.valid) {

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      if (username === 'admin' && password === 'password') {
        console.log('Login successful');
        this.isLoggedIn = true;
      } else {
        console.log('Invalid username or password');
      }

      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePanel(showRecruiters: boolean, showCategories: boolean, showJobList: boolean) {
    this.showRecruitersPanel = showRecruiters;
    this.showCategoriesPanel = showCategories;
    this.showJobList = showJobList;
    this.resetFields();
  }

  toggleRecruiters() {
    this.togglePanel(true, false, false);
  }

  toggleCategories() {
    this.togglePanel(false, true, false);
  }

  toggleJobList() {
    this.togglePanel(false, false, true);
  }

  resetFields() {
    this.recruiterName = '';
    this.recruiterEmail = '';
    this.recruiterCategory = '';
  }

  // recruiter

  recruiterName: any = '';
  recruiterEmail: any = '';
  recruiterCategory: any = '';
  recruiters: { name: string, email: string, category: string }[] = [];
  editingIndex: number | null = null;
  index: any = '';
  isEditing: any = '';
  showCategoryPanel: boolean = false;

  toggleCategoryPanel() {
    this.showCategoryPanel = !this.showCategoryPanel;
  }

  addRecruiter() {
    if (this.recruiterName && this.recruiterEmail && this.recruiterCategory) {
      this.recruiters.push({
        name: this.recruiterName,
        email: this.recruiterEmail,
        category: this.recruiterCategory
      });

      this.storeData();

      this.resetFields();
    }
  }

  editRecruiter(index: number) {
    this.editingIndex = index;

    const recruiter = this.recruiters[index];

    // Check if the recruiter is found
    if (recruiter) {
      this.recruiterName = recruiter.name;
      this.recruiterEmail = recruiter.email;
      this.recruiterCategory = recruiter.category;

      this.isEditing = true;

    } else {
      console.error('Recruiter not found!');
    }
  }

  updateRecruiter() {
    if (this.index === null) {
      console.error("Index is null.");
      return;
    }

    const recruiter = this.recruiters[this.index];

    recruiter.name = this.recruiterName;
    recruiter.email = this.recruiterEmail;
    recruiter.category = this.recruiterCategory;

    this.storeData();

    this.resetFields();
  }

  deleteRecruiter(index: number) {
    this.recruiters.splice(index, 1);

    this.storeData();
  }


  // category
  // 
  // categoryName: string = '';
  // editingCategoryIndex: number | null = null;

  // addCategory() {
  //   if (this.categoryName.trim() !== '') {
  //     this.categories.push({ name: this.categoryName });

  //     this.storeData();

  //     this.resetCategoryFields();
  //   }
  // }

  // editCategory(index: number) {
  //   this.editingCategoryIndex = index;
  //   this.categoryName = this.categories[index].name;
  // }

  // updateCategory() {
  //   if (this.editingCategoryIndex !== null) {
  //     this.categories[this.editingCategoryIndex].name = this.categoryName;

  //     this.storeData();

  //     this.resetCategoryFields();
  //   }
  // }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);

    this.storeData();

    // this.resetCategoryFields();
  }

  // resetCategoryFields() {
  //   this.categoryName = '';
  //   this.editingCategoryIndex = null;
  // }

  retrieveData() {

    const storedRecruiters = localStorage.getItem('recruiters');
    if (storedRecruiters) {
      this.recruiters = JSON.parse(storedRecruiters);
    }

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


  // for job
  // jobs: any[] = [];
  // category: string = '';
  // companyName: string = '';
  // location: string = '';
  // description: string = '';
  // countryName: any;
  // country: any;

  // addJob() {
  //   if (this.category && this.countryName && this.companyName && this.location && this.description) {
  //     // Add new job to the list
  //     this.jobs.push({
  //       category:this.category,
  //       country : this.countryName,
  //       company: this.companyName,
  //       location: this.location,
  //       description: this.description,

  //     });

  //     // Save updated job list to local storage
  //     localStorage.setItem('jobs', JSON.stringify(this.jobs));

  //     // Clear input fields after adding job
  //     this.category = '';
  //     this.countryName = '';
  //     this.companyName = '';
  //     this.location = '';
  //     this.description = '';

  //   }
  // }
  // // job post
  categories = [
    "Flutter",
    "Web developer",
    "Web design",
    "Marketing",
    "UI/UX Designer",
  ];

  countries = [
    "India",
    "Jaipur",
    "Kolkata",
    "Bangalore",
    "Mumbai",

  ];

  jobPosts: any[] = [
    {
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'India',
      "category": 'UI/UX Designer'
    }, {
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'India',
      "category": 'UI/UX Designer'
    }, {
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'India',
      "category": 'UI/UX Designer'
    }, {
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'India',
      "category": 'UI/UX Designer'
    }, {
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'India',
      "category": 'UI/UX Designer'
    }, {
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'India',
      "category": 'UI/UX Designer'
    },
    {
      "title": "UI/UX Designer",
      "company": "Design Co.",
      "location": "Sarthana",
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "category": "UI/UX Designer",
      "country": 'India'

    }, {
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'India',
      "category": 'UI/UX Designer'
    },
    {
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'India',
      "category": 'UI/UX Designer'
    },
    {
      "title": 'UI/UX Designer',
      "company": 'Company A',
      "location": 'Location X',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'India',
      "category": 'UI/UX Designer'
    },
    {
      "title": "Flutter",
      "company": "Data Insights Inc.",
      "location": "Motavarachha",
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "category": "Flutter",
      "country": 'India'

    },
    {
      "title": "Flutter",
      "company": "Data Insights Inc.",
      "location": "Motavarachha",
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "category": "Flutter",
      "country": 'Mumbai'

    },
    {
      "title": "Flutter",
      "company": "Data Insights Inc.",
      "location": "Motavarachha",
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "category": "Flutter",
      "country": 'Kolkata'

    },
    {
      "title": 'Web design',
      "company": 'xyz',
      "location": 'Adajan',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Bangalore',
      "category": 'Web design',

    },
    {
      "title": 'Web developer',
      "company": 'abc',
      "location": 'LalDarwaja',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Kolkata',
      "category": 'Web developer',
    },
    {
      "title": 'Web developer',
      "company": 'abcd',
      "location": 'Varachha',
      "description": "We are looking for a skilled Frontend Developer to join our team. You will be responsible for creating responsive and user-friendly web applications using HTML, CSS, and JavaScript.",
      "country": 'Mumbai',
      "category": 'Web developer',
    }

  ];


  addJobPost(job: any) {
    this.jobPosts.push(job);
    this.storeData();
  }

  retrieveJobPosts() {
    const storedJobPosts = localStorage.getItem('jobPosts');
    if (storedJobPosts) {
      this.jobPosts = JSON.parse(storedJobPosts);
    }
  }

  // toggleJobList(): void {
  //   // if (this.showRightPanel) {
  //   //   this.showRightPanel = false;
  //   //   this.selectedJobIndex = null;
  //   // }
  //   this.showJobList = !this.showJobList;
  // }

  deleteJob(index: number) {
    this.jobPosts.splice(index, 1);

    this.storeData();
  }

  storeData() {
    localStorage.setItem('recruiters', JSON.stringify(this.recruiters));
    localStorage.setItem('countries', JSON.stringify(this.countries));
    localStorage.setItem('categories', JSON.stringify(this.categories));
    localStorage.setItem('jobPosts', JSON.stringify(this.jobPosts));
  }

}