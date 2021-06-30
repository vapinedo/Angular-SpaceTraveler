import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Aeronave } from '../interfaces/aeronave.interface';

@Injectable()
export class AeronaveService {

  private readonly collectionName = 'aeronaves';

  constructor(private afs: AngularFirestore) {}

  public create(item: Aeronave): Promise<any> {
    return this.afs.collection<Aeronave>(this.collectionName).add(item);
  }

  public read(): Observable<any> {
    return this.afs.collection<Aeronave>(this.collectionName)
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

  public readOne(id: string): Observable<Aeronave | undefined> {
    return this.afs.doc<Aeronave>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public update(item: Aeronave) {
    return this.afs.collection<Aeronave>(this.collectionName)
      .doc(item.id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<Aeronave>(this.collectionName)
      .doc(id).delete();
  }

}