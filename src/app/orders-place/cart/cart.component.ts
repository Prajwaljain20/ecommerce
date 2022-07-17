import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: IProduct[] = [];
  loading = true;
  totalPrice = 0;
  totalQuantity = 0;
  userId: string = '';

  constructor(private cartService: CartService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.currentUser$
      .pipe(
        switchMap((res) => {
          this.userId = res?.uid!;
          return this.cartService.getUserCart(res?.uid!);
        })
      )
      .subscribe((res) => {
        this.products = res['products'];
        let totalPrice = 0;
        let totalQuantity = 0;
        this.products.forEach((res) => {
          totalQuantity += <number>res.quantity;
          totalPrice += <number>res.quantity * <number>res.price;
        });
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.cartService.cartQuantity.next({
          quantity: totalQuantity,
          price: totalPrice,
        });
      });
    setTimeout(() => (this.loading = false), 1000);
  }
  addToCart(cartId: string | undefined, operation: string) {
    if (cartId) {
      let found = false;
      this.products?.forEach((res, index) => {
        if (res.id == cartId) {
          found = true;
          operation == '+' ? res.quantity!++ : res.quantity!--;
          if (res.quantity == 0) {
            this.products?.splice(index, 1);
          }
        }
      });
    }
    this.cartService.updateProductCart(this.userId, this.products);
  }
}
