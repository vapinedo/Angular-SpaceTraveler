import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Aeronave } from '@core/interfaces/aeronave.interface';
import { MessageService } from '@core/services/message.service';
import { AeronaveService } from '@core/services/aeronave.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileuploaderService } from '@core/services/fileuploader.service';

@Component({
  selector: 'app-aeronave-update',
  templateUrl: './aeronave-update.component.html',
  styleUrls: ['./aeronave-update.component.scss']
})
export class AeronavePropertyUpdateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public form: FormGroup;
  public aeronaveID: any;
  private file: any = null;
  public showSpinner: boolean = false;

  public imgPreviewUrl: string[] = [];
  public title = 'Aeronave Actualizar';

  public isInvalidFormats: boolean = false;
  public readonly allowedFormats = '.jpeg,.jpg,.png,.svg';
  private readonly validFormats: string[] = ['image/jpeg', 'image/png'];

  public readonly MIN_LENGTH_DESCRIPCION = 10;
  public readonly MAX_LENGTH_DESCRIPCION = 120;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private aeronaveSvc: AeronaveService,
    private activatedRoute: ActivatedRoute,
    private fileuploaderSvc: FileuploaderService
  ) {
    this.aeronaveID = activatedRoute.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      imagen: [null],
      disponible: [false],
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      descripcion: [null, [
        Validators.minLength(this.MIN_LENGTH_DESCRIPCION),
        Validators.maxLength(this.MAX_LENGTH_DESCRIPCION)
      ]],
      capacidadTripulantes: [null, [Validators.required]]
    }); 
  }

  ngOnInit(): void {
    this._setForm();
  }

  private _setForm(): void {
    this.subscriptions.add(
      this.aeronaveSvc.readOne(this.aeronaveID)
        .subscribe({
          next: data => {
            this.form.patchValue({
              id: this.aeronaveID,
              imagen: data?.imagen,
              nombre: data?.nombre,
              precio: data?.precio,
              descripcion: data?.descripcion,
              capacidadTripulantes: data?.capacidadTripulantes
            });
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  onFileChange(event: any) {
    this.file = event.target.files;

    if (this.file && this._filesIsImage(this.file)) {
      this._generateImgPreview(this.file);
    } else {
      this.isInvalidFormats = true;
    }
    return; 
  }

  private _generateImgPreview(file: FileList): void {
    const reader = new FileReader();
    reader.onload = () => this.imgPreviewUrl.push(reader.result as string);
    reader.readAsDataURL(file[0]);
  }

  private _filesIsImage(file: any): boolean {
    const format = file[0].type;
    return this.validFormats.includes(format) ? true : false;
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;

      try {
        let fileURL: string = '';
        if (this.file) {
          console.log('SI')
          fileURL = await this.fileuploaderSvc.upload(this.file[0]);
        } else {
          console.log('NO')
          fileURL = formData.imagen;
        }

        const newData = this._prepareDataBeforeSend(formData, fileURL);
        const dataCreated = await this.aeronaveSvc.update(newData);

        this.showSpinner = false;
        this.messageSvc.success('Registro actualizado exitosamente');
        this.router.navigate(['/admin/aeronaves']);
      }
      catch (err) { 
        this.showSpinner = false;
        this.messageSvc.error(err); 
      }
    }
    return;
  }

  private _prepareDataBeforeSend(data: any, fileURL: string): Aeronave {
    let response: Aeronave = {
      id: data.id,
      imagen: fileURL,
      nombre: data.nombre,
      precio: data.precio,
      disponible: data.disponible,
      descripcion: data.descripcion,
      capacidadTripulantes: data.capacidadTripulantes
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}