import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

const modules = [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
];

@NgModule({
    imports: [modules],
    exports: [modules],
    providers: [ 
        { provide: BUCKET, useValue: 'gs://catalogo-revistas.appspot.com' }
    ]
})
export class FirebaseModule { }