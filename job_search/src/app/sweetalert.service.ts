import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }
  
 showErrorAlert(title: string, message:string): void{
  Swal.fire({
    icon:'error',
    title: title,
    text: message
  });
 }
 
 showSuccessAlert(title: string, message: string): void {
  Swal.fire({
    icon: 'success',
    title: title,
    text: message
  });
}

}
