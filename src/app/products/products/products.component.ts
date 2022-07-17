import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICart } from '../../models/cart.interface';
import { ICategory } from '../../models/category.interface';
import { IProduct } from '../../models/product.interface';
import { ISubcategory } from '../../models/subcategory.interface';
import { IWishlist } from '../../models/wishlist.interface';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  coll: any;
  hide = false;
  category$: ICategory[] = [];
  products$: IProduct[] = [];
  subCategory$: ISubcategory[] = [];
  filterProducts: IProduct[] = [];
  cartValue!: ICart;
  wishValue!: IWishlist;

  loading = false;
  categoryId!: string;
  subcategoryId!: string;
  productSearch!: string;
  userName: string | null | undefined;

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private category: CategoryService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    this.loading = true;
    this.category.getCategory().subscribe((res) => {
      this.category$ = res;
    });
    this.category.getSubcategory().subscribe((res) => {
      this.subCategory$ = res;
    });
    productService.getProduct().subscribe((res) => {
      this.filterProducts = this.products$ = res;
    });

    route.queryParams.subscribe((res) => {
      if (res) {
        this.categoryId = res['category'];
        this.subcategoryId = res['subcategory'];
        this.productSearch = res['productSearch'];
        this.loading = true;
        setTimeout(() => {
          if (this.categoryId) {
            this.filterProducts = this.categoryId
              ? this.products$.filter((data) =>
                  data.category?.includes(this.categoryId)
                )
              : this.products$;
          } else if (this.subcategoryId) {
            this.filterProducts = this.subcategoryId
              ? this.products$.filter((data) =>
                  data.subcategory?.includes(this.subcategoryId)
                )
              : this.products$;
          } else {
            this.filterProducts = this.productSearch
              ? this.products$.filter((data) =>
                  data.name
                    ?.toLowerCase()
                    ?.includes(this.productSearch.toLowerCase())
                )
              : this.products$;
          }
          this.loading = false;
        }, 1300);
      }
    });

    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe((res) => {
      this.userName = res?.uid;
      if (this.userName) {
        this.cartService.getUserCart(this.userName).subscribe((res) => {
          this.cartValue = res;
        });
      }
    });
    this.auth.currentUser$.subscribe((res) => {
      this.userName = res?.uid;
      if (this.userName) {
        this.wishlistService.getUserWish(this.userName).subscribe((res) => {
          this.wishValue = res;
        });
      }
    });
  }

  existCart(productId: string | undefined): number {
    let returnValue: number | undefined = 0;
    this.cartValue.products?.forEach((res) => {
      if (res.id == productId) {
        returnValue = res.quantity;
      }
    });
    return returnValue;
  }

  existWish(productId: string | undefined): boolean {
    let returnValue: boolean = false;
    this.wishValue.products?.forEach((res) => {
      if (res.product_id == productId) {
        returnValue = true;
      }
    });
    return returnValue;
  }

  addToCart(cart: IProduct, operation: string, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (cart.id && this.userName) {
      let found = false;
      this.cartValue.products?.forEach((res, index) => {
        if (res.id == cart.id) {
          found = true;
          operation == '+' ? res.quantity!++ : res.quantity!--;
          if (res.quantity == 0) {
            this.cartValue.products?.splice(index, 1);
          }
        }
      });
      if (!found) {
        this.cartValue.products?.push({
          image: cart.image,
          id: cart.id,
          quantity: 1,
          name: cart.name,
          price: cart.price,
        });
      }
    }
    this.cartService.updateCart(this.cartValue);
  }
  addToWishlist(wish: IProduct, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (wish.id && this.userName) {
      let found = false;
      this.wishValue.products?.forEach((res, index) => {
        if (res.product_id == wish.id) {
          found = true;
          this.wishValue.products?.splice(index, 1);
        }
      });
      if (!found) {
        this.wishValue.products?.push({
          image: wish.image,
          product_id: wish.id,
          name: wish.name,
          price: wish.price,
        });
      }
    }
    this.wishlistService.updateWishlist(this.wishValue);
  }
}
