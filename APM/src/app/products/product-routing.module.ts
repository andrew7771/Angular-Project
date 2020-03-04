import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-detail.guard';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'products', component: ProductListComponent},
            { 
                path: 'products/:id', 
                component: ProductDetailComponent,
                canActivate: [ProductDetailGuard]
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class ProductRoutingModule {}