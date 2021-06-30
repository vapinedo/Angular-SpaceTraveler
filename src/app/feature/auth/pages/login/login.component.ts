import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from '@core/services/message.service';
import { LoginData } from '@core/interfaces/login-data.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@core/services/validators.service';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public subscriptions = new Subscription();

  public form: FormGroup;
  public authError = false;
  public title = 'Space Traveler - Login';
  public showSpinner: boolean = false;
  
  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private storageSvc: StorageService,
    private messageSvc: MessageService,
    private validatorsSvc: ValidatorsService,
    ) {
      this.form = this.fb.group({
        email: [null, [
          Validators.required,
          Validators.pattern(this.validatorsSvc.VALID_EMAIL_STRING)
        ]],
        password: [null, [Validators.required]]
      }); 
    }

  async onSubmit() {
    if (this.form.valid) {
      this.showSpinner = true;
      const formData = this.form.value;
      const authData = this._prepareDataBeforeSend(formData);

      this.subscriptions.add(
        this.authSvc.login(authData)
          .subscribe({
            next: (user: any) => {
              if (user.length > 0) {
                delete user[0].password;
                this.router.navigate(['/catalogo']);
                this.storageSvc.setItem('user', user[0]);
              } else {
                this.messageSvc.error('Usuario o contraseño no válidos'); 
              }
            },
            complete: () => this.showSpinner = false
          })
      );
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): LoginData {
    let response: LoginData = {
      email: data.email,
      password: data.password
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}