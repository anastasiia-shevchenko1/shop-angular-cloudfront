import { Injectable } from '@angular/core';
import { CONFIG_TOKEN } from './injection-tokens/config.token';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private readonly config = inject(CONFIG_TOKEN);

  storeCredentials(): void {
    const { user } = this.config;
    const encodedCredentials = btoa(`${user?.username}:${user?.password}`);
    localStorage.setItem('authorization_token', encodedCredentials);
  }
}
