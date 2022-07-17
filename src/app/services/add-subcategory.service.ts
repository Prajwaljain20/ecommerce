import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { ISubcategory } from '../models/subcategory.interface';

@Injectable({
  providedIn: 'root',
})
export class AddSubcategoryService {
  constructor(private firestore: Firestore) {}

  addCategory(data: ISubcategory) {
    const ref = doc(this.firestore, `subcategory/${data.id}`);

    return setDoc(ref, data);
  }
}
