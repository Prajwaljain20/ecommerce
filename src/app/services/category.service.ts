import { Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.interface';
import { ISubcategory } from '../models/subcategory.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: Firestore) {}
  getCategory() {
    const ref = collection(this.firestore, 'category');
    return collectionData(ref, { idField: 'id' }) as Observable<ICategory[]>;
  }
  addCategory(data: ICategory) {
    const ref = doc(this.firestore, `category/${data.id}`);
    return setDoc(ref, data);
  }
  addSubcategory(data: ISubcategory) {
    const ref = doc(this.firestore, `subcategory/${data.id}`);
    return setDoc(ref, data);
  }
  getSubcategory() {
    const ref = collection(this.firestore, `subcategory`);
    return collectionData(ref, { idField: 'id' }) as Observable<ISubcategory[]>;
  }
  getSpecSubcategory(name: string) {
    const ref = doc(this.firestore, `subcategory/${name}`);
    return docData(ref) as Observable<{ name: string[] }>;
  }
}
