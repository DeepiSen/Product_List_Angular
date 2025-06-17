import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, Observable, shareReplay } from 'rxjs';
import { Product } from '../model/product.model'; 


@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://6850b8a7e7c42cfd179961d5.mockapi.io/api/prod/products').pipe(
      shareReplay(1), // Cache result
      catchError(err => {
        console.error('Failed to fetch products:', err);
        return of([] as Product[]);
      })
    );
  }
}
