import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  onCategoryChange(arg0: EventTarget|null) {
    throw new Error('Method not implemented.');
    }
    
      categories = [
        "IT",
        "Sales",
        "Marketing",
        "Finance",
        "Design"
      ];
    
    
      countrys = [
        "India",
        "Mumbai",
        "Kolkata",
        "Bangaluru",
        "Chennai",
        "Jaipur"
      ]
            
}
