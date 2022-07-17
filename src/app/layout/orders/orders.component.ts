import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { IOrder } from '../../models/order.interface';
import { AuthService } from '../../services/auth.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  loading = false;
  orders: IOrder = {};
  constructor(private orderService: OrdersService, private auth: AuthService) {}

  ngOnInit(): void {
    this.loading = true;
    this.auth.currentUser$.subscribe((res) => {
      this.orderService.getUserOrder(res?.uid!).subscribe((data) => {
        this.orders = data;
        this.loading = false;
      });
    });
  }
}
