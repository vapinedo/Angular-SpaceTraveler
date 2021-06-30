import { SubSink } from 'subsink';
import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Alquiler } from '@core/interfaces/alquiler.interface';
import { MessageService } from '@core/services/message.service';
import { AlquilerService } from '@core/services/alquiler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@core/services/validators.service';

@Component({
  selector: 'app-alquiler-create',
  templateUrl: './alquiler-create.component.html',
  styleUrls: ['./alquiler-create.component.scss']
})
export class AlquilerCreateComponent implements OnDestroy {

  private subscriptions = new SubSink();

  public aeronaveID: any;
  public form: FormGroup;
  public title = 'Alquilar aeronave';
  public showSpinner: boolean = false;

  public destinos: string[] = ['Orbita Espacial', 'Estación Internacional', 'Luna'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private alquilerSvc: AlquilerService,
    private activatedRoute: ActivatedRoute,
    private validatorsSvc: ValidatorsService,
    ) {
      this.aeronaveID = activatedRoute.snapshot.paramMap.get('id');

      this.form = this.fb.group({
        userID: [null, [Validators.required]],
        destino: [null, [Validators.required]],
        aeronaveID: [null, [Validators.required]],
        fechaPartida: [null, [Validators.required]],
        fechaRegreso: [null, [Validators.required]],
        numeroPasajeros: [null, [Validators.required]]
      }); 
  }
  
  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;

      try {
        const newData = this._prepareDataBeforeSend(formData);
        const dataCreated = await this.alquilerSvc.create(newData);

        this.showSpinner = false;
        this.messageSvc.success();
        this.router.navigate(['/admin/catalogo']);
      }
      catch (err) { 
        this.showSpinner = false;
        this.messageSvc.error(err); 
      }
    }
    return;
  }

  private _prepareDataBeforeSend(data: any): Alquiler {
    let response: Alquiler = {
      destino: data.destino,
      aeronaveID: this.aeronaveID,
      userID: '4nRm1LSIr2jYYdNf3n89',
      fechaPartida: data.fechaPartida,
      fechaRegreso: data.fechaRegreso,
      numeroPasajeros: data.numeroPasajeros,
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}