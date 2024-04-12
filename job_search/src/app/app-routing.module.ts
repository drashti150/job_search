import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { EmployeeComponent } from './employee/employee.component';
import { ResumesComponent } from './resumes/resumes.component';
import { BlogComponent } from './blog/blog.component';
import { PagesComponent } from './pages/pages.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { JobService } from './job.service';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  // { path: 'admin', component: AdminComponent, canActivate: [JobService] },



  
  { path: 'admin', component: AdminComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'resumes', component: ResumesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'employers', component: EmployeeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'pages', component: PagesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

