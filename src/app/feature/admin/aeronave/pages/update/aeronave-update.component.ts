import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import { PropertyService } from '@core/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-aeronave-update',
  templateUrl: './aeronave-update.component.html',
  styleUrls: ['./aeronave-update.component.scss']
})
export class AeronavePropertyUpdateComponent implements OnInit, OnDestroy {

  private subscriptions = new SubSink();

  public form: FormGroup;
  public propertyID: any;
  private files: any = null;
  public showSpinner: boolean = false;
  public imgPreviewUrls: string[] = [];
  public title = 'Propiedad Actualizar';

  public isInvalidFormats: boolean = false;
  public readonly allowedFormats = '.jpeg,.jpg,.png,.svg';
  private readonly validFormats: string[] = ['image/jpeg', 'image/png'];

  constructor(
    // private router: Router,
    private fb: FormBuilder,
    private messageSvc: MessageService,
    private propertySvc: PropertyService,
    private activatedRoute: ActivatedRoute,
    // private fileuploaderSvc: FileuploaderService
  ) {
    this.propertyID = activatedRoute.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      id: [null, Validators.required],
      price: [null, Validators.required],
      images: [null, [Validators.required]],
      category: [null, [Validators.required]]
    }); 
  }

  ngOnInit(): void {
    this._setForm();
  }

  private _setForm(): void {
    this.subscriptions.add(
      this.propertySvc.readOne(this.propertyID)
        .subscribe({
          next: data => {
            this.form.patchValue({
              id: this.propertyID,
              price: data?.price,
              images: 'imagenes',
              category: data?.category
            });
            this.imgPreviewUrls = (data?.images) ? data?.images : [];
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }

  onFileChange(event: any): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      // const image = this.images[0];
      // const property = this.form.value;
      // this.propertySvc.update(property, image);
    }
    return;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}