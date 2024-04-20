import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  applyForJob(id: any) {
    throw new Error('Method not implemented.');
  }
  getUserAppliedJobs() {
    throw new Error('Method not implemented.');
  }
  getJobs() {
    throw new Error('Method not implemented.');
  }
  
  isLoggedIn = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}