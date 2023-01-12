import { Injectable } from '@angular/core';
import {collection, doc, docSnapshots, Firestore} from '@angular/fire/firestore';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private firestore: Firestore) {}

  async getUserEventSummary() {
    const ref = doc(this.firestore, 'settings','member');
    return docSnapshots(ref).pipe(map(x => x));
  }

  
}