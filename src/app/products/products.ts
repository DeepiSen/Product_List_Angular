import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, input } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';


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
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})



export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'category'];
  dataSource = new MatTableDataSource<Product>(); //Data source for the product table, initialized with an empty array of products

  @ViewChild(MatSort) sort!: MatSort; // Reference to the MatSort directive for sorting functionality
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;// Reference to the filter input element for filtering products

  constructor(private productsService: ProductsService) { }

  

  ngOnInit(): void {
    this.loadProducts(); 

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;// Assign the MatSort directive to the data source for sorting functionality
    
  }

  // Method to apply filter based on user input
  applyFilter(event: Event): void {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();// Set the filter value to the data source, trimming whitespace and converting to lowercase\console.log(this.dataSource.filteredData.map(p => p.price));
    
  }
  // Method to load products from the service
  loadProducts(): void {
    this.productsService.getProducts()
      .pipe(take(1))
      .subscribe((products: Product[]) => {
        this.dataSource.data = products; // Load products when the component initializes
        console.log(this.dataSource.data);
       // console.log(this.dataSource.filteredData.map(p => p.price));
      });
  }

}