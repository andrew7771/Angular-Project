import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-detail.guard';
import { RouterModule } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';
import { ProductEditGuard } from './product-edit.guard';

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