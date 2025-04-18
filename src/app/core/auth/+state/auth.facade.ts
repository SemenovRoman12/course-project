import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {RegisterUser, SignAuthUser} from '../models/sign.auth.model';
import {AuthActions} from './auth.actions';
import {selectIsAuthenticated} from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private readonly store = inject(Store);

  public readonly isAuthenticated$ = this.store.select(selectIsAuthenticated);

  public register(userData: RegisterUser) {
    this.store.dispatch(AuthActions.register({ userData }));
  }

  public login(userData: SignAuthUser) {
    this.store.dispatch(AuthActions.login({ userData }));
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
