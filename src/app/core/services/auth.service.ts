import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '@core/interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoginData } from '@core/interfaces/login-data.interface';

@Injectable()
export class AuthService {

  private readonly collectionName = 'usuarios';

  constructor(
    private afs: AngularFirestore,
    private storageSvc: StorageService
  ) {}

  public register(item: User): Promise<any> {
    return this.afs.collection<User>(this.collectionName).add(item);
  }

  public login(item: LoginData): Observable<User[]> {
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