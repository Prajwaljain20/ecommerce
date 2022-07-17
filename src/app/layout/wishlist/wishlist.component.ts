import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';
import { IProduct } from '../../models/product.interface';
import { WishlistService } from '../../services/wishlist.service';
import { IWishlist } from '../../models/wishlist.interface';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  products: IWishlist = {};
  loading = true;
  totalPrice = 0;
  totalQuantity = 0;

  constructor(
    private wishlistService: WishlistService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe((res) => {
      this.wishlistService.getUserWish(res?.uid!).subscribe((res) => {
        this.products = res;
        this.loading = false;
      });
    });
  }
  addToWishlist(wishId: string | undefined): void {
    if (wishId && this.products.uid) {
      this.products.products?.forEach((res, index) => {
        if (res.product_id == wishId) {
          this.products.products?.splice(index, 1);
        }
      });
    }
    console.log(this.products);
    this.wishlistService.updateWishlist(this.products);
  }
}
