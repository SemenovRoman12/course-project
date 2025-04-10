import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageTokenService {
  private readonly token: string = 'token';

  public getItem(): string | null {
    return localStorage.getItem(this.token) || null;
  }

  public setItem(value: string) {
    localStorage.setItem(this.token, value);
  }

  public removeItem(){
    localStorage.removeItem(this.token);
  }
}
