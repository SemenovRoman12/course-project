import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {RegisterUser} from '../models/sign.auth.model';
import {AuthActions} from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private readonly store = inject(Store);

  public register(userData: RegisterUser) {
    this.store.dispatch(AuthActions.register({ userData }));
  }
}
