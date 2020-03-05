import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {        
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProductById(id: number): Observable<Product> {
        return this.getProducts().pipe(
            map((products: Product[]) => products.find(p => p.productId === id))
        )
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message};`
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }

        console.log(errorMessage);
        return throwError('');
    }
}