import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {StorageTokenService} from './storage-token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageTokenService = inject(StorageTokenService);
  const token = storageTokenService.getItem();

  return !!token;
};
