import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Owner } from '@core/interfaces/owner.interface';
import { OwnerService } from '@core/services/owner.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Property } from '@core/interfaces/property.interface';
import { MessageService } from '@core/services/message.service';
import { PropertyService } from '@core/services/property.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Neighborhood } from '@core/interfaces/neighborhood.interface';
import { FileuploaderService } from '@core/services/fileuploader.service';
import { NeighborhoodService } from '@core/services/neighborhood.service';
import { PropertyCategory } from '@core/interfaces/property-category.interface';
import { PropertyCategoryService } from '@core/services/property-category.service';

@Component({
  selector: 'app-aeronave-create',
  templateUrl: './aeronave-create.component.html',
  styleUrls: ['./aeronave-create.component.scss']
})
export class AeronaveCreateComponent implements OnDestroy, OnInit {

  private subscriptions = new SubSink();

  public form: FormGroup;
  private files: any = null;
  public title = 'Nueva Propiedad';
  public showSpinner: boolean = false;

  public imgPreviewUrls: string[] = [];
  public showImagesPreview: boolean = false;
  public defaultImage: string = '../../../../../../assets/img/img_placeholder.jpg';
  
  public operationType: any[] = [];
  public owners$!: Observable<Owner[]>;
  public neighborhoods$!: Observable<Neighborhood[]>;
  public propertyCategories$!: Observable<PropertyCategory[]>;

  public isInvalidFormats: boolean = false;
  public readonly allowedFormats = '.jpeg,.jpg,.png,.svg';
  private readonly validFormats: string[] = ['image/jpeg', 'image/png'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ownerSvc: OwnerService,
    private messageSvc: MessageService,
    private propertySvc: PropertyService,
    private neighborhoodSvc: NeighborhoodService,
    private fileuploaderSvc: FileuploaderService,
    private propertyCategorySvc: PropertyCategoryService
    ) {
      this.form = this.fb.group({
      visible: [false],
      description: [null],
      price: [null, [Validators.required]],
      images: [null, [Validators.required]],
      ownerID: [null, [Validators.required]],
      address: [null, [Validators.required]],
      category: [null, [Validators.required]],
      neighborhood: [null, [Validators.required]],
      operationType: [null, [Validators.required]]
    }); 
  }
  
  ngOnInit(): void {
    this.owners$ = this.ownerSvc.read();
    this.neighborhoods$ = this.neighborhoodSvc.read();
    this.operationType = this.propertySvc.readOperationType();
    this.propertyCategories$ = this.propertyCategorySvc.read();
  }

  onFileChange(event: any) {
    this.files = event.target.files;

    console.log(this.files[0]);

    if (this.files) {
      if (this._filesAreOnlyImages(this.files)) {
        this._generateImgPreview(this.files);
      } else {
        this.isInvalidFormats = true;
      }
    }
    return; 
  }

  onDeleteImage(imageIndex: number) {
    const limit = this.imgPreviewUrls.length;

    for(let i=0; i<limit; i++) {
      delete this.files.i;
      this.imgPreviewUrls.splice(i, 1);
    }    
    console.log(this.files);
    console.log(this.imgPreviewUrls);
  }

  private _generateImgPreview(files: FileList): void {
    for(let i=0; i<files.length; i++) { 
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => this.imgPreviewUrls.push(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  private _filesAreOnlyImages(files: any): boolean {
    for(let i=0; i<files.length; i++) {
      const format = files[i].type;
      if (!this.validFormats.includes(format)) {
        return false;
      }
    }
    return true;
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.form.disable();
      this.showSpinner = true;
      const formData = this.form.value;

      try {
        let promises: any[] = [];
        for (let i=0; i<this.files.length; i++) {
          const promise = await this.fileuploaderSvc.upload(this.files[i]);
          promises.push(promise);
        }
        const filesURL = await Promise.all(promises);
        const newData = this._prepareDataBeforeSend(formData, filesURL);
        const dataCreated = await this.propertySvc.create(newData);

        this.showSpinner = false;
        this.messageSvc.success();
        this.router.navigate(['/home/propiedades']);
      }
      catch (err) { this.messageSvc.error(err); }
    }
    return;
  }

  private _prepareDataBeforeSend(data: any, filesURL: string[]): Property {
    let response: Property = {
      images: filesURL,
      price: data.price,
      address: data.address,
      ownerID: data.ownerID,
      visible: data.visible,
      category: data.category,
      description: data.description,
      neighborhood: data.neighborhood,
      operationType: data.operationType
    };
    return response;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}