import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { IOrder } from '../models/order.interface';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private firestore: Firestore,
    private notify: ErrorHandlingService
  ) {}

  addOrder(order: IOrder) {
    let id = order.uid as string;
    const ref = doc(this.firestore, 'orders', id);
    return setDoc(ref, order);
  }

  getUserOrder(orderid: string) {
    const ref = doc(this.firestore, 'orders', orderid);
    return docData(ref);
  }

  updateOrder(order: IOrder) {
    let id = order.uid as string;
    const ref = doc(this.firestore, 'orders', id);
    return setDoc(ref, order)
      .then((res) => this.notify.showSuccess('Order Placed', 'Yuhoo!!'))
      .catch((error) => this.notify.showError(error, 'Error'));
  }
}
