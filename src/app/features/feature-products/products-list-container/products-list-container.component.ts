import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  ProductsListContainerStore
} from '@features/feature-products/products-list-container/products-list-container.store';
import {LetDirective} from '@ngrx/component';
import {MatProgressBar} from '@angular/material/progress-bar';
import {ProductsListComponent} from '@features/feature-products/products-list/products-list.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'products-list-container',
  standalone: true,
  imports: [
    LetDirective,
    MatProgressBar,
    ProductsListComponent,
    JsonPipe
  ],
  templateUrl: './products-list-container.component.html',
  styleUrl: './products-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductsListContainerStore],
})
export class ProductsListContainerComponent implements OnInit {
  private readonly productsStore = inject(ProductsListContainerStore);

  public readonly vm$ = this.productsStore.select((state) => ({
    products: state.products,
    productsStatus: state.productsStatus,
    error: state.error,
  }));

  ngOnInit() {
    this.productsStore.loadProducts();
  }
}
