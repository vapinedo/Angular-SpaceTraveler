import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Neighborhood } from '@core/interfaces/neighborhood.interface';

@Injectable()
export class NeighborhoodService {

  private readonly collectionName = 'barrios';

  constructor(
    private afs: AngularFirestore
  ) {}

  public create(item: Neighborhood): Promise<any> {
    return this.afs.collection<Neighborhood>(this.collectionName).add(item);
  }

  public read(): Observable<any> {
    return this.afs.collection<Neighborhood>(this.collectionName)
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

  public readOne(id: string): Observable<any | undefined> {
    return this.afs.doc<Neighborhood>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public update(item: Neighborhood, id: string) {
    return this.afs.collection<Neighborhood>(this.collectionName)
      .doc(id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<Neighborhood>(this.collectionName)
      .doc(id).delete();
  }

}