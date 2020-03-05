import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports:[        
        SharedModule,
        ProductRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ConvertToSpacesPipe,
        ProductEditComponent
    ]
})
export class ProductModule {}