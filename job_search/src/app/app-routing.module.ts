import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { EmployeeComponent } from './employee/employee.component';
import { ResumesComponent } from './resumes/resumes.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminComponent } from './admin/admin.component';
import { JobService } from './job.service';
import { LoginComponent } from './login/login.component';
import { JobPipe } from './job.pipe';
import { JobapplicationComponent } from './jobapplication/jobapplication.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'resumes', component: ResumesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'employers', component: EmployeeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'jobapplication', component: JobapplicationComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

