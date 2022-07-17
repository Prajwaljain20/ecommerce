import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$: User | null = null;
  currentUser: IUser = {};

  fill = false;
  wishlistFill = false;
  brandFill = false;
  smallLoader = true;
  pill: number = 0;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private cartService: CartService,
    private router:Router
  ) {
    this.auth.currentUser$.subscribe((res) => {
      this.user$ = res;
      if (res) {
        this.user.getUser(res.uid).subscribe((res) => {
          this.currentUser = res;
        });
        this.cartService.getUserCart(res.uid).subscribe((products) => {
          let count = 0;
          if (products['products']) {
            for (let product of products['products']) {
              count += product.quantity;
            }
          }
          this.pill = count;
        });
      }
    });
    setTimeout(() => (this.smallLoader = false), 2000);
  }

  ngOnInit(): void {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  logout() {
    this.currentUser = {
      uid: undefined,
      name: undefined,
      isAdmin: undefined,
      email: undefined,
    };
    this.auth.logout();
  }
  productSearch(event:Event){    
    this.router.navigate(['/product'],{queryParams:{productSearch:(<HTMLInputElement>event.target).value}})
  }

}
