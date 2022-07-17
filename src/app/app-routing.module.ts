import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { LoginComponent } from './signup/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup/signup.component';
import { WishlistComponent } from './layout/wishlist/wishlist.component';
import { CartComponent } from './orders-place/cart/cart.component';
import { ProductsComponent } from './products/products/products.component';
import { ManageProductComponent } from './admin/manage-product/manage-product.component';
import { AdminAuthService } from './services/admin-auth.service';
import { AddComponent } from './admin/add/add.component';
import { CheckOutComponent } from './orders-place/check-out/check-out.component';
import { OrdersComponent } from './layout/orders/orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './admin/users/users.component';
import { OrderPlacedComponent } from './orders-place/order-placed/order-placed.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddSubcategoryComponent } from './admin/add-subcategory/add-subcategory.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'cart',
    component: CartComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'orders',
    component: OrdersComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'product',
    component: ProductsComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'admin-manage/new',
    component: AddComponent,
    canActivate: [AdminAuthService],
  },
  {
    path: 'admin-manage/category',
    component: AddCategoryComponent,
    canActivate: [AdminAuthService],
  },
  {
    path: 'admin-manage/sub-category',
    component: AddSubcategoryComponent,
    canActivate: [AdminAuthService],
  },
  {
    path: 'admin-manage/:id',
    component: AddComponent,
    canActivate: [AdminAuthService],
  },
  {
    path: 'product?category=:name',
    component: ProductsComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'admin-manage',
    component: ManageProductComponent,
    canActivate: [AdminAuthService],
  },
  {
    path: 'admin-users',
    component: UsersComponent,
    canActivate: [AdminAuthService],
  },
  {
    path: 'order-placed',
    component: OrderPlacedComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
