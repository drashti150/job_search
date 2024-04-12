import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css']
})
export class ResumesComponent {

  jobApplicationForm: FormGroup | any;
signupForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.jobApplicationForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      city: [''],
      zip: [''],
      tel: ['', Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')],
      date: [''],
      file: ['']
    });
  }

  onSubmit(): void {
    localStorage.setItem('jobApplicationForm', JSON.stringify(this.jobApplicationForm.value));
  }
}
