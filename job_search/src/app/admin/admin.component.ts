import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetalertService } from '../sweetalert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isLoggedIn: boolean = false;
  loginForm: FormGroup;
  showRecruitersPanel: boolean = false;
  showRightPanel: boolean = false;
  jobApplications: any;
  recruiterForm: FormGroup | undefined;
  recruiterName: any = '';
  recruiterEmail: any = '';
  recruiterCategory: any = '';
  recruiters: { blocked: any;name: string, email: string, category: string}[] = [];
  editingIndex: number | null = null;
  index: any = '';
  isEditing: any = '';
  showCategoryPanel: boolean = false;
  selectedRecruiterName: string ='';
  selectedRecruiterCategory: string = '';
  recruiter: any;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showchangePassword: boolean = false;

  
  constructor(private formBuilder: FormBuilder,  private sweetAlertService: SweetalertService) {

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
      
          if (username.trim() === 'admin' && password.trim() === '1234') {

            this.sweetAlertService.showSuccessAlert('Success..','Login Successfully.');

            this.isLoggedIn = true;

          } else {

            this.sweetAlertService.showErrorAlert('Oops...','Invalid username or password.');
           
          }      
          this.loginForm.reset();
        } else {
          this.loginForm.markAllAsTouched();
        }
      }
      
  togglePanel(showRecruiters: boolean, changePassword: boolean) {
    this.showRecruitersPanel = showRecruiters;
    this.showchangePassword = changePassword;
    this.resetFields();
  }

  toggleRecruiters() {
    this.togglePanel(true , false);
  }

  togglePassword() {
    this.togglePanel(false ,true);
  }

  resetFields() {
    this.recruiterName = '';
    this.recruiterEmail = '';
    this.recruiterCategory = '';
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
      this.sweetAlertService.showErrorAlert('Oops...','Recruiter not Found.');
    }
  }

  updateRecruiter() {
    if (this.editingIndex === null) {
      alert("Index is null.");
      return;
    }
  
    const recruiter = this.recruiters[this.editingIndex];
  
    if (recruiter.blocked) {
      // alert("Recruiter is blocked. Cannot update details.");
      this.sweetAlertService.showErrorAlert('Oops...','Recruiter is blocked. Cannot update details.');
      return;
    }
  
    recruiter.name = this.recruiterName;
    recruiter.email = this.recruiterEmail;
    recruiter.category = this.recruiterCategory;
  
    this.storeData();
  
    this.resetFields();
  
    // Set editingIndex to null to indicate we are no longer editing
    this.editingIndex = null;
  }
 
    async deleteRecruiter(index: number) {
      const confirmed = this.sweetAlertService.showConfirmationDialog(
        'Delete for Job',
        'Are you sure you want to delete this job?'
      );
    
      if (await confirmed) {
        this.recruiters.splice(index, 1);
      } else {
        console.log('Deletion cancelled by user.');
      }
    this.storeData();

    }
    

  retrieveData() {
  
    const storedRecruiters = localStorage.getItem('recruiters');
    if (storedRecruiters) {
      this.recruiters = JSON.parse(storedRecruiters);
    }
  }

  storeData() {
    localStorage.setItem('recruiters', JSON.stringify(this.recruiters));   
  }

  retrieveJobApplications(): void {
    const storedJobApplications = localStorage.getItem('jobApplications');
    if (storedJobApplications) {
      this.jobApplications = JSON.parse(storedJobApplications);
    }
  }
   
  blockRecruiter(recruiter: any) {
        recruiter.blocked = !recruiter.blocked;
        this.storeData(); 
}

  addRecruiter() {
    if (this.recruiterName && this.recruiterEmail && this.recruiterCategory) {
      // Check if the recruiter already exists
      const existingRecruiter = this.recruiters.find(recruiter => recruiter.email === this.recruiterEmail);
      if (existingRecruiter) {
        // alert("Recruiter with the same email already exists.");      
        this.sweetAlertService.showErrorAlert('Oops...','Recruiter with the same email already exists.');

        return;
      }
  
      // Add the new recruiter
      this.recruiters.push({
        name: this.recruiterName,
        email: this.recruiterEmail,
        category: this.recruiterCategory,
        blocked: undefined
      });
  
      this.storeData(); 
      this.resetFields(); // Reset input fields
    }
  }
}