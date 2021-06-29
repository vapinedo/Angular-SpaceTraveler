import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Owner } from '@core/interfaces/owner.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class OwnerService {

  private readonly collectionName = 'propietarios';

  constructor(
    private afs: AngularFirestore,
  ) {}

  public create(item: Owner): Promise<any> {
    return this.afs.collection<Owner>(this.collectionName).add(item);
  }

  public read(): Observable<any> {
    return this.afs.collection<Owner>(this.collectionName)
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

  public readOne(id: string): Observable<Owner | undefined> {
    return this.afs.doc<Owner>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public update(item: Owner, id: string) {
    return this.afs.collection<Owner>(this.collectionName)
      .doc(id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<Owner>(this.collectionName)
      .doc(id).delete();
  }

}