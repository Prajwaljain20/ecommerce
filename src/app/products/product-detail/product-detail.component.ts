import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICart } from 'src/app/models/cart.interface';
import { IProduct } from 'src/app/models/product.interface';
import { IWishlist } from 'src/app/models/wishlist.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product!: IProduct;
  cartValue!: ICart;
  wishValue!: IWishlist;
  userName: string | null | undefined;
  loading = false;
  productId: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private auth: AuthService
  ) {
    this.productId = this.route.snapshot.params['id'];
    this.loading = true;
    this.productService.getSpecificProduct(this.productId).subscribe((data) => {
      this.product = data;
      this.loading = false;
    });
    this.auth.currentUser$.subscribe((res) => {
      this.userName = res?.uid;
      if (this.userName) {
        this.cartService.getUserCart(this.userName).subscribe((res) => {
          this.cartValue = res;
          console.log(this.cartValue);
        });
      }
    });
    this.auth.currentUser$.subscribe((res) => {
      this.userName = res?.uid;
      if (this.userName) {
        this.wishlistService.getUserWish(this.userName).subscribe((res) => {
          this.wishValue = res;
          console.log(this.wishValue);
        });
      }
    });
  }

  ngOnInit(): void {}
  existCart(): number {
    let returnValue: number | undefined = 0;
    this.cartValue?.products?.forEach((res) => {
      if (res.id == this.productId) {
        returnValue = res.quantity;
      }
    });
    return returnValue;
  }

  existWish(): boolean {
    let returnValue: boolean = false;
    this.wishValue?.products?.forEach((res) => {
      if (res.product_id == this.productId) {
        returnValue = true;
      }
    });
    return returnValue;
  }
  addToCart(operation: string) {
    if (this.productId && this.userName) {
      let found = false;
      this.cartValue.products?.forEach((res, index) => {
        if (res.id == this.productId) {
          found = true;
          operation == '+' ? res.quantity!++ : res.quantity!--;
          if (res.quantity == 0) {
            this.cartValue.products?.splice(index, 1);
          }
        }
      });
      if (!found) {
        this.cartValue.products?.push({
          image: this.product.image,
          id: this.productId,
          quantity: 1,
          name: this.product.name,
          price: this.product.price,
        });
      }
    }
    this.cartService.updateCart(this.cartValue);
  }
  addToWishlist() {
    if (this.productId && this.userName) {
      let found = false;
      this.wishValue.products?.forEach((res, index) => {
        if (res.product_id == this.productId) {
          found = true;
          this.wishValue.products?.splice(index, 1);
        }
      });
      if (!found) {
        this.wishValue.products?.push({
          image: this.product.image,
          product_id: this.productId,
          name: this.product.name,
          price: this.product.price,
        });
      }
    }
    this.wishlistService.updateWishlist(this.wishValue);
  }
}
