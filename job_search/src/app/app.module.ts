import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { HeaderComponent } from './header/header.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobPipe } from './job.pipe';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ResumesComponent } from './resumes/resumes.component';
import { BlogComponent } from './blog/blog.component';
import { PagesComponent } from './pages/pages.component';
import { JobsComponent } from './jobs/jobs.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    JobSearchComponent,
    HeaderComponent,
    JobListingComponent,
    JobPipe,
    HomeComponent,
    EmployeeComponent,
    ResumesComponent,
    BlogComponent,
    PagesComponent,
    JobsComponent,
    AboutusComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
