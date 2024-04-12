
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JobService } from './job.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate {

  // constructor(private jobService: JobService, private router: Router) { }

  // canActivate(): boolean {
  //   if (this.jobService.isLoggedIn) {
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/login');
  //     return false;
  //   }
  // }
// };
