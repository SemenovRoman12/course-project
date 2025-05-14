import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ProductEntity} from '@features/products/products-list-container/products-list-container.store';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {CurrencyPipe, NgStyle} from '@angular/common';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatIcon,
    CurrencyPipe,
    NgStyle
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!: ProductEntity
}
