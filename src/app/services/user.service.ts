import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { collection, doc, setDoc } from '@firebase/firestore';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  save(user: IUser) {
    const ref = doc(this.firestore, `users/${user.uid}`);
    return setDoc(ref, user);
  }

  getAllUsers() {
    const ref = collection(this.firestore, 'users');
    return collectionData(ref);
  }

  getUser(userId: string | undefined) {
    const ref = doc(this.firestore, 'users', userId!);
    return docData(ref);
  }
}
