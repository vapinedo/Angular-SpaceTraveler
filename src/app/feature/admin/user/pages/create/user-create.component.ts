import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { MessageService } from '@core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@core/services/validators.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnDestroy {

  private subscriptions = new SubSink();

  public readonly MIN_LENGTH_NOMBRE = 3;
  public readonly MAX_LENGTH_NOMBRE = 20;
  public readonly MAX_LENGTH_APELLIDOS = 50;
  public readonly MIN_LENGTH_PASSWORD = 6;
  public readonly MAX_LENGTH_PASSWORD = 12;

  public form: FormGroup;
  public title = 'Nuevo Usuario';
  public showSpinner: boolean = false;

  public roles: string[] = ['Admin', 'User'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userSvc: UserService,
    private messageSvc: MessageService,
    private validatorsSvc: ValidatorsService,
    ) {
      this.form = this.fb.group({
        nombre: [null, [
          Validators.required,
          Validators.minLength(this.MIN_LENGTH_NOMBRE), 
          Validators.maxLength(this.MAX_LENGTH_NOMBRE), 
        ]],
        apellidos: [null, [
          Validators.required,
          Validators.minLength(this.MIN_LENGTH_NOMBRE), 
          Validators.maxLength(this.MAX_LENGTH_APELLIDOS), 
        ]],
        rol: [null, [Validators.required]],
        email: [null, [
          Validators.required,
          Validators.pattern(this.validatorsSvc.VALID_EMAIL_STRING)
        ]],
        password: [null, [
          Validators.required,
          Validators.minLength(this.MIN_LENGTH_PASSWORD), 
          Validators.maxLength(this.MAX_LENGTH_PASSWORD), 
        ]]
      }); 
  }
  
  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;

      try {
        const newData = this._prepareDataBeforeSend(formData);
        const dataCreated = await this.userSvc.create(newData);

        this.showSpinner = false;
        this.messageSvc.success();
        this.router.navigate(['/admin/usuarios']);
      }
      catch (err) { 
        this.showSpinner = false;
        this.messageSvc.error(err); 
      }
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): User {
    let response: User = {
      rol: data.rol,
      email: data.email,
      nombre: data.nombre,
      password: data.password,
      apellidos: data.apellidos
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}