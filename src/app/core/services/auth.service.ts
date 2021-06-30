import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginData } from '@core/interfaces/login-data.interface';
import { RegisterData } from '@core/interfaces/register-data.interface';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

  private readonly collectionName = 'usuarios';

  constructor(
    private afs: AngularFirestore,
    private storageSvc: StorageService
  ) {}

  public register(item: RegisterData): Promise<any> {
    return this.afs.collection<RegisterData>(this.collectionName).add(item);
  }

  public login(item: LoginData): Observable<RegisterData[]> {
    return this.afs.collection<any>(this.collectionName)
      .valueChanges()
      .pipe(
        map(users => 
          users.filter(user => {
            return (user.email === item.email) && (user.password === item.password);
          })
        ),
      );
  }

  public logout(): void {
    this.storageSvc.deleteItem('userLogged');
  }

}