import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ChangeProfileDataPayload, RegisterUser, SignAuthUser} from '@auth/data-access/models/sign.auth.model';
import {AuthActions} from '@auth/data-access/+state/auth.actions';
import {selectAuthStatus, selectIsAuthenticated, selectLoggedUser} from '@auth/data-access/+state/auth.selectors';

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

  public changeProfile(data: ChangeProfileDataPayload) {
    this.store.dispatch(AuthActions.changeProfileData({data}));
  }
}
