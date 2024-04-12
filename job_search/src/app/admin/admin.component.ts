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

  constructor(private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }
  // login
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

  toggleRightPanel() {
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

      // Store recruiter details in local storage
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
      // Handle the case when index is null
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

  categoryName: string = '';
  categories: { name: string }[] = [];
  editingCategoryIndex: number | null = null;

  addCategory() {
    if (this.categoryName.trim() !== '') {
      this.categories.push({ name: this.categoryName });

      this.storeData();

      this.resetCategoryFields();
    }
  }

  editCategory(index: number) {
    this.editingCategoryIndex = index;
    this.categoryName = this.categories[index].name;
  }

  updateCategory() {
    if (this.editingCategoryIndex !== null) {
      this.categories[this.editingCategoryIndex].name = this.categoryName;

      this.storeData();

      this.resetCategoryFields();
    }
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);

    this.storeData();

    this.resetCategoryFields();
  }

  resetCategoryFields() {
    this.categoryName = '';
    this.editingCategoryIndex = null;
  }

  retrieveData() {
    const storedRecruiters = localStorage.getItem('recruiters');
    if (storedRecruiters) {
      this.recruiters = JSON.parse(storedRecruiters);
    }

    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    }

    const storedJobPosts = localStorage.getItem('jobPosts');
    if (storedJobPosts) {
      this.jobPosts = JSON.parse(storedJobPosts);
    }
  }


  filterByCategory(): void {
    // Logic to filter job listings by selected category
    const selectedCategory = (document.getElementById('category-list') as HTMLSelectElement).value;
    if (selectedCategory === 'all') {
      // Show all job listings
      console.log('Filtering job listings by all categories');
    } else {
      // Filter job listings by selected category
      console.log('Filtering job listings by category:', selectedCategory);
    }
  }

  // job post
  jobPosts: any[] = [{
    title: 'Job Title 1', 
    company: 'Company A', 
    location: 'Location X', 
    description: 'Description of job 1',

  },
  {
    title: 'Job Title 1', company: 'Company A', location: 'Location X', description: 'Description of job 1',

  },
  {
    title: 'Job Title 1', company: 'Company A', location: 'Location X', description: 'Description of job 1',

  },
  ];


  addJobPost(job: any) {
    this.jobPosts.push(job);
    this.storeData();
  }

  // retrieveJobPosts() {
  //   const storedJobPosts = localStorage.getItem('jobPosts');
  //   if (storedJobPosts) {
  //     this.jobPosts = JSON.parse(storedJobPosts);
  //   }
  // }

  toggleJobList(): void {
    if (this.showRightPanel) {
      this.showRightPanel = false;
      this.selectedJobIndex = null;
    }
    this.showJobList = !this.showJobList;
  }

  storeData() {
    localStorage.setItem('recruiters', JSON.stringify(this.recruiters));
    localStorage.setItem('categories', JSON.stringify(this.categories));
    localStorage.setItem('jobPosts', JSON.stringify(this.jobPosts));
  }

}