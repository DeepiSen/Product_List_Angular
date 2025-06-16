import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-dashboard';
}
