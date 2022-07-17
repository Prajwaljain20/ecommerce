import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/category.interface';
import { IProduct } from 'src/app/models/product.interface';
import { ISubcategory } from 'src/app/models/subcategory.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  category$!: ICategory[];
  subcategory$!: ISubcategory[];
  item: IProduct = {};

  forms;
  id;

  loading = false;

  constructor(
    private category: CategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.forms = fb.group({
      name: [, Validators.required],
      price: [, [Validators.required]],
      category: [, Validators.required],
      subcategory: [, Validators.required],
      image: [, Validators.required],
      description: [, Validators.required],
    });
    this.id = this.route.snapshot.params['id'];
    this.loading = true;
    setTimeout(() => {
      if (this.id) {
        this.productService.getSpecificProduct(this.id).subscribe((item) => {
          this.item = item;
        });
      }
      this.loading = false;
    }, 2000);
  }

  ngOnInit(): void {
    this.category.getCategory().subscribe((res) => {
      this.category$ = res;
    });
    this.category.getSubcategory().subscribe((res) => {
      this.subcategory$ = res;
    });
  }

  get Category():string {
    return this.forms.controls['category'].value!;
  }

  get Name() {
    return this.forms.controls['name'].value!;
  }

  get Price() {
    return this.forms.controls['price'].value!;
  }

  get Subcategory() {
    return this.forms.controls['subcategory'].value!;
  }

  get Image() {
    return this.forms.controls['image'].value!;
  }

  get Description() {
    let description: string = this.forms.controls['description'].value!;
    return description.split(';');
  }

  onSubmit() {
    this.item = {
      name: this.Name,
      price: this.Price,
      category: this.Category,
      subcategory: this.Subcategory,
      image: this.Image,
      description: this.Description,
    };
    if (this.id) {
      this.productService.setProduct(this.id, this.item);
    } else {
      this.productService.addProduct(this.item);
    }
    this.router.navigate(['/admin-manage']);
  }
}
