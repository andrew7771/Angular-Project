import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements  OnInit {
    
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    products: IProduct[];
    filteredProducts: IProduct[];

    showImage: boolean = false;
    
     _listFilter : string;
  errorMessage: any;
    public get listFilter() : string {
        return this._listFilter;
    }
    public set listFilter(value : string) {
        this._listFilter = value;
    }
          
      constructor(private _productService: ProductService) {
            //this.listFilter = 'cart';
      }

      onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;  
      }

      performFilter(filterBy: string) : IProduct[] {
          filterBy = filterBy.toLocaleLowerCase();
          return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      ngOnInit(): void {
          this._productService.getProducts().subscribe({
            next: products => { 
              this.products = products,
              this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
          });
          //this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
      }

      toggleImage() : void {
          this.showImage = !this.showImage;
      }
}