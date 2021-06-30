import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage';

@Injectable()
export class FileuploaderService {

  public task!: AngularFireUploadTask;              
  public isInvalidFormats: boolean = false;
  public progressValue!: Observable<number | undefined>;

  public readonly basePath = '/aeronaves';                       
  public readonly allowedFormats = '.jpeg,.jpg,.png,.svg';
  private readonly validFormats: string[] = ['image/jpeg', 'image/png'];

  constructor(
    private storage: AngularFireStorage
  ) {}

  public async upload(file: any): Promise<any> {
    const filePath = `${this.basePath}/${file.name}`;  
    const task =  this.storage.upload(filePath, file);
    const response = (await task).ref.getDownloadURL();
    return response;
  }

}