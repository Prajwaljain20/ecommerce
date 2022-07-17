import { Injectable } from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { IWishlist } from '../models/wishlist.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private firestore: Firestore) {}

  addWishlist(wish: IWishlist) {
    let id = wish.uid as string;
    const ref = doc(this.firestore, 'wishlist', id);
    return setDoc(ref, wish);
  }

  getUserWish(id: string) {
    const ref = doc(this.firestore, 'wishlist', id);
    return docData(ref);
  }

  updateWishlist(wish: IWishlist) {
    let wishid = wish.uid as string;
    const ref = doc(this.firestore, 'wishlist', wishid);
    return setDoc(ref, wish);
  }

  updateProductWish(id: string, wish: IWishlist) {
    const ref = doc(this.firestore, 'wishlist', id);
    return updateDoc(ref, { products: wish.products });
  }
}
