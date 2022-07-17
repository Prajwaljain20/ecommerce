import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/category.interface';
import { ISubcategory } from 'src/app/models/subcategory.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css'],
})
export class AddSubcategoryComponent implements OnInit {
  loading = false;
  form: FormGroup;
  data: ISubcategory = {};
  category$!: ICategory[];
  subCategory: string[] = [];
  count = 0;
  items: string[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.form = fb.group({
      category: [, Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe((res) => {
      this.category$ = res;
    });
  }

  get Name(): string {
    return this.form.controls['name'].value;
  }
  get Id(): string {
    return this.form.controls['category'].value;
  }
  getSubcategory() {
    this.categoryService.getSpecSubcategory(this.Id).subscribe((res) => {
      this.items = res.name;
    });
  }
  onSubmit() {
    this.subCategory.push(this.Name);
    this.data.id = this.Id;
    this.data.name = this.subCategory;
    this.items.push(this.Name);
    this.data.name = this.items;
    if (this.count == 0) {
      this.count++;
      this.categoryService.addSubcategory(this.data).then(() => {
        this.router.navigate(['/admin-manage']);
      });
    }
  }
}
