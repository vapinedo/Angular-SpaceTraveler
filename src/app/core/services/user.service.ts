import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '@core/interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UserService {

  private readonly collectionName = 'usuarios';

  constructor(private afs: AngularFirestore) {}

  public create(item: User): Promise<any> {
    return this.afs.collection<User>(this.collectionName).add(item);
  }

  public read(): Observable<any> {
    return this.afs.collection<User>(this.collectionName)
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

  public readOne(id: string): Observable<User | undefined> {
    return this.afs.doc<User>(`${this.collectionName}/${id}`)
      .valueChanges();
  }

  public update(item: User) {
    return this.afs.collection<User>(this.collectionName)
      .doc(item.id).update(item);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection<User>(this.collectionName)
      .doc(id).delete();
  }

}