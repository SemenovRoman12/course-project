import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {RegisterUser, SignAuthUser} from './models/sign.auth.model';
import {AuthActions} from './+state/auth.actions';
import {selectAuthStatus, selectIsAuthenticated, selectLoggedUser} from './+state/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  private readonly store = inject(Store);

  public readonly isAuthenticated$ = this.store.select(selectIsAuthenticated);
  public readonly loggedUser$ = this.store.select(selectLoggedUser);
  public readonly authStatus$ = this.store.select(selectAuthStatus);

  public register(userData: RegisterUser) {
    this.store.dispatch(AuthActions.register({ userData }));
  }

  public login(userData: SignAuthUser) {
    this.store.dispatch(AuthActions.login({ userData }));
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }

  public getUser() {
    this.store.dispatch(AuthActions.getUser());
  }
}
