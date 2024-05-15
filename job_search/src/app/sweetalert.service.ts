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

 async showConfirmationDialog(title: string, text: string): Promise<boolean> {
  const result = await Swal.fire({
     title: title,
     text: text,
     icon: 'question',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, proceed!'
   });
   return result.isConfirmed;
}

}
