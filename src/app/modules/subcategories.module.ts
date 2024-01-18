import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubcategoriesrouterComponent } from '../components/subcategories/subcategoriesrouter/subcategoriesrouter.component';
import { SubcategoriesmainComponent } from '../components/subcategories/subcategoriesmain/subcategoriesmain.component';
import { AddsubcategoryComponent } from '../components/subcategories/addsubcategory/addsubcategory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditsubcategoryComponent } from '../components/subcategories/editsubcategory/editsubcategory.component';
import { EditcategoryComponent } from '../components/Category/editcategory/editcategory.component';


const subCatogries:Routes=[
  {path:'',component:SubcategoriesrouterComponent,children:[
    {path:'',component:SubcategoriesmainComponent},
    {path:'add',component:AddsubcategoryComponent},
    {path:'edit/:id',component:EditsubcategoryComponent}
  ]}
]


@NgModule({
  declarations: [SubcategoriesmainComponent,SubcategoriesrouterComponent,AddsubcategoryComponent,EditsubcategoryComponent],
  imports: [
    CommonModule,RouterModule.forChild(subCatogries),ReactiveFormsModule
  ]
})
export class SubcategoriesModule { 
  constructor(){
    console.log("subcategories Module")
  }
}
