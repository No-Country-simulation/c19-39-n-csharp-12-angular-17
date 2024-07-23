import { Injectable } from "@angular/core";
import Swal from "sweetalert2";


@Injectable
({
  providedIn: 'root'
})
export class SweetAlertService {
  constructor(){}

  public Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  success(message: string, title?: string): void {
    Swal.fire({
      icon: 'success',
      title: title || 'Success',
      text: message
    });
  }

  error(message: string, title?: string): void {
    Swal.fire({
      icon: 'error',
      title: title || 'Error',
      text: message
    });
  }

  alert(title?: string): void {
    Swal.fire({
      icon: 'error',
      title: title || 'Error',
    });
  }


}
