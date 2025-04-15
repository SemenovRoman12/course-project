import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {StorageTokenService} from './storage-token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageTokenService);

  if (!storage.getItem()) {
    return false;
  }

  return true;
};
