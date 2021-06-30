import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {

  constructor(private toastr: ToastrService) { }

  success(message?: string): ActiveToast<any> {
    const msg = message ? message : 'Registro creado exitosamente!';
    return this.toastr.success(msg);
  }
  
  error(message: string): ActiveToast<any> {
    return this.toastr.error(message);
  }

  confirm(): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'warning',
      title: '¿Está seguro?',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirmar',
      text: "Estás a punto de eliminar un registro"
    }); 
  } 

}

