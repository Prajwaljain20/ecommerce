import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { UsersComponent } from './users/users.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';

@NgModule({
  declarations: [
    AddComponent,
    UsersComponent,
    ManageProductComponent,
    SideNavComponent,
    AddCategoryComponent,
    AddSubcategoryComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [AddComponent, UsersComponent, ManageProductComponent],
})
export class AdminModule {}
