import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { ICategory } from '../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class AddCategoryService {
  constructor(private firestore: Firestore) {}

  addCategory(data: ICategory) {
    const ref = doc(this.firestore, `category/${data.id}`);
    return setDoc(ref, data);
  }
}
