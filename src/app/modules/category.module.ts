import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AddCatagoryComponent } from '../components/Category/add-catagory/add-catagory.component';
import { CatagoryRouterComponent } from '../components/Category/catagory-router/catagory-router.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryMainComponent } from '../components/Category/category-main/category-main.component';
import { RemoveCategoryComponent } from '../components/Category/remove-category/remove-category.component';
import { EditcategoryComponent } from '../components/Category/editcategory/editcategory.component';

const catagoryRote: Routes = [
  {
    path: '', component: CatagoryRouterComponent, children: [
      { path: '', component: CategoryMainComponent },
      { path: 'add', component: AddCatagoryComponent },
      {path:'remove',component:RemoveCategoryComponent},
      {path:'edit/:id',component:EditcategoryComponent}
    ]
  }
]

@NgModule({
  declarations: [
      AddCatagoryComponent, CatagoryRouterComponent,RemoveCategoryComponent,CategoryMainComponent,EditcategoryComponent
  ],
  imports: [RouterModule.forChild(catagoryRote), CommonModule,ReactiveFormsModule],
  exports: [RouterModule],
})
export class CategoryModule {
  constructor() {
    console.log("catagory Module")
  }
}