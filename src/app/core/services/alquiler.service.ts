import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Alquiler } from '@core/interfaces/alquiler.interface';

@Injectable()
export class AlquilerService {

  private readonly collectionName = 'alquileres';

  constructor(private afs: AngularFirestore) {}

  public create(item: Alquiler): Promise<any> {
    return this.afs.collection<Alquiler>(this.collectionName).add(item);
  }

  public read(): Observable<any> {
    return this.afs.collection<Alquiler>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(data => 
          data.map(item => {
            const id = item.payload.doc.id;
            const payload = item.payload.doc.data() as object; 
            return { id, ...payload };
          })
        )
      );
  }

  public readOne(id: string): Observable<Alquiler | undefined> {
    return this.afs.doc<Alquiler>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public update(item: Alquiler) {
    return this.afs.collection<Alquiler>(this.collectionName)
      .doc(item.id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<Alquiler>(this.collectionName)
      .doc(id).delete();
  }

}