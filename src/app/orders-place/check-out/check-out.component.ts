import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INewOrder } from '../../models/newOrder.interface';
import { IOrder } from '../../models/order.interface';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  form;
  newOrder!: INewOrder;
  orders: IOrder = {};
  price: number = 0;
  id: string | undefined;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private orderService: OrdersService,
    private router: Router,
    private cartService: CartService
  ) {
    this.form = fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-Za-z ]+$/),
        ],
      ],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      payment: ['', Validators.required],
    });
    this.auth.currentUser$.subscribe((res) => {
      this.id = res?.uid;
      this.orderService.getUserOrder(res?.uid!).subscribe((order) => {
        this.orders = order;
      });
    });
    this.cartService.cartQuantity.subscribe((res) => {
      this.price = res.price;
    });
  }

  ngOnInit(): void {}

  get name():string {
    return this.form.get('name')?.value!;
  }
  get address1() {
    return this.form.get('address1')?.value;
  }
  get address2() {
    return this.form.get('address2')?.value;
  }
  get payment():string {
    return this.form.get('payment')?.value!;
  }

  onSubmit() {
    this.newOrder = {
      name: this.name,
      address: this.address1 + ' <br> ' + this.address2,
      totalPrice: this.price,
      pay: this.payment,
      dateTime: new Date().toLocaleString('en-IN', { timeZone: 'IST' }),
    };
    this.orders.order?.push(this.newOrder);
    this.orderService.updateOrder(this.orders).then((res) => {
      this.cartService.updateProductCart(this.id!, []);
      this.cartService.cartQuantity.next({ quantity: 0, price: 0 });
      this.router.navigate(['/order-placed']);
    });
  }
}
