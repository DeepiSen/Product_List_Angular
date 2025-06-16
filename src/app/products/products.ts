import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductsService } from '../services/product.service';
import { Product } from '../model/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [  
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'category'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]); // Initialize with empty array

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().pipe(
      take(1) // Using RxJS take operator
    ).subscribe({
      next: (products) => {
        this.dataSource = new MatTableDataSource(products);
        this.setSorting(); // Call sorting after data load
      },
      error: (err) => console.error('Error loading products', err)
    });
  }

  ngAfterViewInit() {
    this.setSorting(); // Also try to set sorting when view ready
  }

  private setSorting() {
    if (this.sort && this.dataSource.data.length) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}