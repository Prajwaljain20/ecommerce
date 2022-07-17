import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit {
  products$: IProduct[] = [];
  searchProducts: IProduct[] = [];

  loading = false;
  displayModal = 'none';
  productName: string | undefined;
  productId: string | undefined;
  mySideNav: string = '0';
  main: string = '0';
  open = false;

  constructor(private productService: ProductService) {
    this.loading = true;
    this.productService.getProduct().subscribe((data) => {
      this.searchProducts = this.products$ = data;
      this.loading = false;
    });
  }

  ngOnInit(): void {}

  confirmDelete(id: string | undefined, name: string | undefined): void {
    this.displayModal = 'block';
    this.productName = name;
    this.productId = id;
  }

  delete(): void {
    this.productService.deleteProduct(this.productId);
    this.close();
  }
  search(data: string) {
    this.searchProducts = data
      ? this.products$.filter((item) =>
          item.name?.toLowerCase().includes(data.toLowerCase())
        )
      : this.products$;
  }

  close() {
    this.productName = undefined;
    this.productId = undefined;
    this.displayModal = 'none';
  }

  closeNav() {
    this.mySideNav = '0';
    this.main = '0';
  }
  openNav() {
    if (this.open) {
      this.open = false;
      this.closeNav();
    } else {
      this.open = true;
      this.mySideNav = '250px';
      this.main = '250px';
    }
  }
}
