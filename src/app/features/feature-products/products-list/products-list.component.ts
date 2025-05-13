import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ProductEntity} from '@features/feature-products/products-list-container/products-list-container.store';
import {ProductCardComponent} from '@features/feature-products/product-card/product-card.component';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [
    ProductCardComponent
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent {
  @Input() products!: ProductEntity[]
}
