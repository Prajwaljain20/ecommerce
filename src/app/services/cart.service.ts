import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { setDoc, updateDoc } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { ICart } from '../models/cart.interface';
import { IProduct } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartQuantity = new BehaviorSubject<{ quantity: number; price: number }>({
    quantity: 0,
    price: 0,
  });

  constructor(private firestore: Firestore) {}

  getCartProducts(id: string) {
    const ref = doc(this.firestore, 'cart', id, 'products');
    return docData(ref);
  }

  addCart(cart: ICart) {
    let id = cart.uid as string;
    const ref = doc(this.firestore, 'cart', id);
    return setDoc(ref, cart);
  }

  getUserCart(cartid: string) {
    const ref = doc(this.firestore, 'cart', cartid);
    return docData(ref);
  }

  updateCart(cart: ICart) {
    let cartid = cart.uid as string;
    const ref = doc(this.firestore, 'cart', cartid);
    return setDoc(ref, cart);
  }

  updateProductCart(id: string, cart: IProduct[]) {
    const ref = doc(this.firestore, 'cart', id);
    return updateDoc(ref, { products: cart });
  }
}
