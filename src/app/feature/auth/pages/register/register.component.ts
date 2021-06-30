import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from '@core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@core/services/validators.service';
import { RegisterData } from '@core/interfaces/register-data.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public subscriptions = new Subscription();

  public form: FormGroup;
  public authError = false;
  private defaultRol = 'pasajero';
  public showSpinner: boolean = false;
  public title = 'Space Traveler - Registro';
  
  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private messageSvc: MessageService,
    private validatorsSvc: ValidatorsService,
    ) {
      this.form = this.fb.group({
        nombre: [null, [Validators.required]],
        apellidos: [null, [Validators.required]],
        rol: [this.defaultRol, [Validators.required]],
        email: [null, [
          Validators.required,
          Validators.pattern(this.validatorsSvc.VALID_EMAIL_STRING)
        ]],
        password: [null, [Validators.required]],
        confirmar_password: [null, [Validators.required]]
      }); 
    }

  async onSubmit() {
    if (this.form.valid) {
      this.showSpinner = true;
      const formData = this.form.value;

      try {
        const userData = this._prepareDataBeforeSend(formData);
        const response = await this.authSvc.register(userData);

        this.showSpinner = false;
        this.messageSvc.success(); 
        this.router.navigate(['/auth/login']);
      }
      catch (err) {
        this.messageSvc.error(err); 
      }            
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): RegisterData {
    let response: RegisterData = {
      rol: data.rol,
      email: data.email,
      nombre: data.nombre,
      password: data.password,
      apellidos: data.apellidos
    };
    return response;
  }

}