import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  loading = false;
  form: FormGroup;
  data: ICategory = {};

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get Name(): string {
    return this.form.controls['name'].value;
  }
  get Image(): string {
    return this.form.controls['image'].value;
  }
  get Id(): string {
    return (<string>this.form.controls['name'].value)
      .toLowerCase()
      .replace(/\s/g, '');
  }
  onSubmit() {
    this.data.id = this.Id;
    this.data.name = this.Name;
    this.data.image = this.Image;
    this.categoryService.addCategory(this.data).then(() => {
      this.categoryService
        .addSubcategory({ id: this.data.id, name: [] })
        .then(() => this.router.navigate(['/admin-manage']));
    });
  }
}
