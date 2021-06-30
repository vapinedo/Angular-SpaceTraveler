import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { Aeronave } from '@core/interfaces/aeronave.interface';
import { MessageService } from '@core/services/message.service';
import { AeronaveService } from '@core/services/aeronave.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileuploaderService } from '@core/services/fileuploader.service';

@Component({
  selector: 'app-aeronave-create',
  templateUrl: './aeronave-create.component.html',
  styleUrls: ['./aeronave-create.component.scss']
})
export class AeronaveCreateComponent implements OnDestroy {

  private subscriptions = new SubSink();

  public form: FormGroup;
  private file: any = null;
  public title = 'Nueva Aeronave';
  public showSpinner: boolean = false;

  public imgPreviewUrl: string[] = [];
  public showImagePreview: boolean = false;
  public defaultImage: string = '../../../../../../assets/img/default_img.jpg';
  
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
    private fileuploaderSvc: FileuploaderService,
    ) {
      this.form = this.fb.group({
        disponible: [false],
        nombre: [null, [Validators.required]],
        imagen: [null, [Validators.required]],
        precio: [null, [Validators.required]],
        descripcion: [null, [
          Validators.minLength(this.MIN_LENGTH_DESCRIPCION),
          Validators.maxLength(this.MAX_LENGTH_DESCRIPCION)
        ]],
        capacidadTripulantes: [null, [Validators.required]]
    }); 
  }
  
  onFileChange(event: any) {
    this.file = event.target.files;

    if (this.file && this._filesIsImage(this.file)) {
      this._generateImgPreview(this.file);
      this.form.controls.imagen.setValue('img');
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
        const fileURL = await this.fileuploaderSvc.upload(this.file[0]);
        const newData = this._prepareDataBeforeSend(formData, fileURL);
        const dataCreated = await this.aeronaveSvc.create(newData);

        this.showSpinner = false;
        this.messageSvc.success();
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
      nombre: data.nombre,
      imagen: fileURL,
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