import { Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  getProduct() {
    const ref = collection(this.firestore, 'products');
    return collectionData(ref, { idField: 'id' });
  }

  addProduct(item: IProduct) {
    const ref = collection(this.firestore, 'products');
    return addDoc(ref, item);
  }

  getSpecificProduct(id: string) {
    const ref = doc(this.firestore, 'products', id);
    return docData(ref) as Observable<IProduct>;
  }

  setProduct(id: string, item: IProduct) {
    const ref = doc(this.firestore, 'products', id);
    return setDoc(ref, item);
  }
  deleteProduct(id: string | undefined) {
    if (id) {
      const ref = doc(this.firestore, 'products', id);
      return deleteDoc(ref);
    }
    return;
  }
}
