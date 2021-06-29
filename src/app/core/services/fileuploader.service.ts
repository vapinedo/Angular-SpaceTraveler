import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage';

@Injectable()
export class FileuploaderService {

  public task!: AngularFireUploadTask;              
  public isInvalidFormats: boolean = false;
  public progressValue!: Observable<number | undefined>;

  public readonly basePath = '/propiedades';                       
  public readonly allowedFormats = '.jpeg,.jpg,.png,.svg';
  private readonly validFormats: string[] = ['image/jpeg', 'image/png'];

  constructor(
    private messageSvc: MessageService,
    private storage: AngularFireStorage
  ) {}

  public async upload(file: any) {
    if (file && this._fileIsOnlyImage(file)) {
      const filePath = `${this.basePath}/${file.name}`;  
      const task =  this.storage.upload(filePath, file);
      const response = (await task).ref.getDownloadURL();
      return response;
    }
    return;
  }

  private _fileIsOnlyImage(file: any): boolean {
    const format = file.type;
    return (this.validFormats.includes(format)) ? true : false;
  }

}