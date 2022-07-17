import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';

@NgModule({
  declarations: [CartComponent, CheckOutComponent, OrderPlacedComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [CartComponent, CheckOutComponent, OrderPlacedComponent],
})
export class OrdersPlaceModule {}
