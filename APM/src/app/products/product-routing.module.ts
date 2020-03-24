import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { RouterModule } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'products', component: ProductListComponent},
            { 
                path: 'products/:id', 
                component: ProductDetailComponent,
                canActivate: [ProductDetailGuard]
            },
            {
                path: 'products/:id/edit',
                canDeactivate: [ProductEditGuard],
                component: ProductEditComponent
              }
        ])
    ],
    exports: [ RouterModule ]
})
export class ProductRoutingModule {}