import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alquiler } from '@core/interfaces/alquiler.interface';
import { MessageService } from '@core/services/message.service';
import { AlquilerService } from '@core/services/alquiler.service';
import { AeronaveService } from '@core/services/aeronave.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@core/services/validators.service';
import { DatetimeService } from '@core/services/datetime.service';

@Component({
  selector: 'app-alquiler-create',
  templateUrl: './alquiler-create.component.html',
  styleUrls: ['./alquiler-create.component.scss']
})
export class AlquilerCreateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public nave!: any;
  public aeronaveID: any;
  public form: FormGroup;
  public fechaHoy = new Date();
  public title = 'Alquilar aeronave';
  public showSpinner: boolean = false;

  public destinos: string[] = ['Orbita Espacial', 'Estación Internacional', 'Luna'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private alquilerSvc: AlquilerService,
    private aeronaveSvc: AeronaveService,
    private datetimeSvc: DatetimeService,
    private activatedRoute: ActivatedRoute,
    private validatorsSvc: ValidatorsService,
    ) {
      this.aeronaveID = activatedRoute.snapshot.paramMap.get('naveID');

      this.form = this.fb.group({
        userID: [null, [Validators.required]],
        destino: [null, [Validators.required]],
        aeronaveID: [null, [Validators.required]],
        fechaPartida: [null, [Validators.required]],
        fechaRegreso: [null, [Validators.required]],
        numeroPasajeros: [null, [Validators.required]]
      }); 
  }

  ngOnInit(): void {
    this.aeronaveSvc.readOne(this.aeronaveID) 
      .subscribe({
        next: data => this.nave = data,
        error: err => this.messageSvc.error(err)
      })
  }
  
  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;
      const newData = this._prepareDataBeforeSend(formData);

      try {
        const newData = this._prepareDataBeforeSend(formData);
        const dataCreated = await this.alquilerSvc.create(newData);

        this.showSpinner = false;
        this.messageSvc.success('Alquiler creado exitosamente');
        this.router.navigate(['/catalogo']);
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
      numeroPasajeros: data.numeroPasajeros,
      fechaRegreso: this.datetimeSvc.dateToYearhMonthDay(data.fechaRegreso),
      fechaPartida: this.datetimeSvc.dateToYearhMonthDay(data.fechaPartida)
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}