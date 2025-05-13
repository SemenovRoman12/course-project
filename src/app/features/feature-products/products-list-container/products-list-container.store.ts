import {inject, Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {LoadingStatus} from '@models/loading-status.type';
import {catchError, of, switchMap, tap} from 'rxjs';
import {ApiService} from '@core/http/api.service';

export interface ProductEntity {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface ProductsState {
  products: ProductEntity[];
  productsStatus: LoadingStatus;
  error: Error | null;
}

@Injectable()
export class ProductsListContainerStore extends ComponentStore<ProductsState> {

  private readonly apiService = inject(ApiService)

  constructor() {
    super({
      products: [],
      productsStatus: 'init',
      error: null,
    });
  }

  public readonly setProducts = this.updater<ProductEntity[]>((state, products) => ({
    ...state,
    products,
  }));

  public readonly setStatus = this.updater<LoadingStatus>((state, productsStatus) => ({
    ...state,
    productsStatus,
  }));

  public readonly setError = this.updater<Error>((state, error) => ({
    ...state,
    error,
  }));

  public readonly loadProducts = this.effect(
    (trigger$) => trigger$.pipe(
      tap(() => this.setStatus('loading' as const)),
      switchMap(() =>
        this.apiService.get<ProductEntity[]>('/products').pipe(
          tap((products) => {
            this.setProducts(products)
            this.setStatus('loaded' as const)
          }),
          catchError((error: Error) => {
            this.setError(error);
            this.setStatus('error' as const);
            return of();
          })
        )
      )
    )
  );
}
