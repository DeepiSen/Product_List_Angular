import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, Observable, shareReplay } from 'rxjs';
import { Product } from '../model/product.model'; 

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>('src/assets/products.json').pipe(
      catchError(err => {
        console.error('Failed to fetch products:', err);
        return of([] as Product[]); // Return empty array on error
      })
    );
  }
}

// @Injectable({ providedIn: 'root' })
// export class ProductsService {
//   // Should NOT contain any references to ProductsComponent
//   constructor(private http: HttpClient) {}

//   getProducts(): Observable<Product[]> {
//     return this.http.get<Product[]>('assets/products.json').pipe(
//       shareReplay(1)  // ← Good practice for HTTP requests
//     );
//   }
// }
