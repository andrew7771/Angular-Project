import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
    imports:[        
        SharedModule,
        ProductRoutingModule
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ConvertToSpacesPipe
    ]
})
export class ProductModule {}