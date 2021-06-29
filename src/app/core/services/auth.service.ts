import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginData } from '@core/interfaces/login-data.interface';

@Injectable()
export class AuthService {

  public userData: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth
  ) { 
    this.userData = afAuth.authState;
    }

  public getCurrentUser(): Observable<any> {
    return this.afAuth.user;
  }

  public loginByEmail(item: LoginData): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(item.email, item.password);
  }

  public logout(): Promise<void> {
    return this.afAuth.signOut();
  }

}