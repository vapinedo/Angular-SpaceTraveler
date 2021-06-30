import { SubSink } from 'subsink';
import { User } from '@core/interfaces/user.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@core/services/validators.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserPropertyUpdateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public readonly MIN_LENGTH_NOMBRE = 3;
  public readonly MAX_LENGTH_NOMBRE = 20;
  public readonly MAX_LENGTH_APELLIDOS = 50;
  public readonly MIN_LENGTH_PASSWORD = 6;
  public readonly MAX_LENGTH_PASSWORD = 12;

  public userID: any;
  public form: FormGroup;
  public title = 'Actualizar Usuario';
  public showSpinner: boolean = false;

  public roles: string[] = ['Admin', 'Astronauta', 'Pasajero'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userSvc: UserService,
    private messageSvc: MessageService,
    private activatedRoute: ActivatedRoute,
    private validatorsSvc: ValidatorsService,
    ) {
      this.userID = activatedRoute.snapshot.paramMap.get('id');

      this.form = this.fb.group({
        id: [null, [Validators.required]],
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

  ngOnInit(): void {
    this._setForm();
  }

  private _setForm(): void {
    this.subscriptions.add(
      this.userSvc.readOne(this.userID)
        .subscribe({
          next: data => {
            this.form.patchValue({
              id: this.userID,
              rol: data?.rol,
              email: data?.email,
              nombre: data?.nombre,
              password: data?.password,
              apellidos: data?.apellidos
            });
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {

      
      
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;
      
      try {
        const newData = this._prepareDataBeforeSend(formData);
        const dataCreated = await this.userSvc.update(newData);

        this.showSpinner = false;
        this.messageSvc.success('Registro actualizado exitosamente');
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
      id: data.id,
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