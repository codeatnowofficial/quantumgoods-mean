import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { AboutComponent } from '../components/about/about.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { HomeComponent } from '../components/home/home.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { AddproductPageComponent } from '../components/pages/addproduct-page/addproduct-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersIndividualPageComponent } from '../components/pages/users-individual-page/users-individual-page.component';
const homeRoutes: Routes = [
  {path:'',component:HomeComponent,children:[
    {path:'',component:HeroComponent},
    {path:'about',component:AboutComponent},
    {path:'addproduct',component:AddproductPageComponent},
    {path:'catagory', loadChildren:() => import('./category.module').then(mod => mod.CategoryModule)},
    {path:'sub-category',loadChildren:()=>import('./subcategories.module').then(mod => mod.SubcategoriesModule)},
    {path:'user-products',component:UsersIndividualPageComponent}
  ]}
]

@NgModule({
  declarations:[
    NavBarComponent,
    AboutComponent,
    HeroComponent,
    HomeComponent,SidebarComponent,AddproductPageComponent,UsersIndividualPageComponent
  ],
  imports: [RouterModule.forChild(homeRoutes),CommonModule,ReactiveFormsModule],
  exports: [RouterModule],
})
export class HomeModule {
  constructor(){
    console.log("homeModule")
  }
 }