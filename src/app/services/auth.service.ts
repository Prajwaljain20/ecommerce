import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../models/user.interface';
import { CartService } from './cart.service';
import { ErrorHandlingService } from './error-handling.service';
import { OrdersService } from './orders.service';
import { UserService } from './user.service';
import { WishlistService } from './wishlist.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private wishlistService: WishlistService,
    private orderService: OrdersService,
    private notify: ErrorHandlingService
  ) {}

  signUp(name: string, email: string, password: string, admin: boolean) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: name });
        const objdata: IUser = {
          name: name,
          isAdmin: admin,
          uid: result.user.uid,
          email: email,
          created: new Date().toLocaleString('en-IN', { timeZone: 'IST' }),
        };
        this.userService.save(objdata);
        this.cartService.addCart({ uid: result.user.uid, products: [] });
        this.wishlistService.addWishlist({
          uid: result.user.uid,
          products: [],
        });
        this.orderService.addOrder({
          uid: result.user.uid,
          userName: name,
          order: [],
        });
        this.notify.showSuccess('User Registered', 'Success');
        this.router.navigate(['']);
      })
      .catch((error: FirebaseError) => {
        this.notify.showError(error.message, 'Error');
      });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        this.notify.showSuccess(`Welcome ${res.user.displayName}`, 'Success');
        this.router.navigate(['']);
      })
      .catch((error: FirebaseError) => {
        this.notify.showError(error.message.substring(22, 36), 'Error');
      });
  }

  logout() {
    return signOut(this.auth)
      .then((res) => {
        this.notify.showWarning('Logged Out', 'Attention!');
        this.cartService.cartQuantity.next({ quantity: 0, price: 0 });
        this.router.navigate(['']);
      })
      .catch((error: FirebaseError) => {
        this.notify.showError(error.message.substring(22, 36), 'Error');
      });
  }
}
