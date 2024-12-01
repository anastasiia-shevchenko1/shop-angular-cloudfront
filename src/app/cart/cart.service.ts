import { computed, Injectable, signal } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CartResponse } from './cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService extends ApiService {
  /** Key - item id, value - ordered amount */
  #cart = signal<Record<string, number>>({});

  cart = this.#cart.asReadonly();

  totalInCart = computed(() => {
    const values = Object.values(this.cart());

    if (!values.length) {
      return 0;
    }

    return values.reduce((acc, val) => acc + val, 0);
  });

  get cartId() {
    return localStorage.getItem('cart_id');
  }

  addItem(id: string): Observable<void> {
    return this.updateCount(id, 1);
  }

  removeItem(id: string): Observable<void> {
    return this.updateCount(id, -1);
  }

  empty(): void {
    this.#cart.set({});
  }

  getCart(): Observable<void> {
    let cartApi = this.getUrl('cart', 'cart');

    if (this.cartId) {
      cartApi = `${cartApi}?id=${encodeURIComponent(this.cartId)}`;
    }

    return this.http.get<CartResponse>(cartApi).pipe(
      map((response) => response.data.cart),
      tap((cart) => {
        if (!this.cartId) {
          localStorage.setItem('cart_id', cart['user_id']);
        }
      }),
      tap((cart) => {
        const cartData: Record<string, number> = {};
        cart.items.forEach((item) => {
          cartData[item.product.id] = item.count;
        });
        this.#cart.set(cartData);
      }),
      map(() => void 0),
    );
  }

  private updateCount(id: string, type: 1 | -1): Observable<void> {
    const val = this.cart();
    const newVal = {
      ...val,
    };

    let cartApi = this.getUrl('cart', 'cart');

    if (this.cartId) {
      cartApi = `${cartApi}?id=${encodeURIComponent(this.cartId)}`;
    }

    if (!(id in newVal)) {
      newVal[id] = 0;
    }

    if (type === 1) {
      newVal[id] = ++newVal[id];
    } else {
      if (newVal[id] === 0) {
        console.warn('No match. Skipping...');
        return new Observable();
      }
      newVal[id]--;
      if (!newVal[id]) {
        delete newVal[id];
      }
    }

    this.#cart.set(newVal);

    const items = Object.keys(newVal).map((key) => ({
      product: { id: key },
      count: newVal[key],
    }));

    return this.http.put<CartResponse>(cartApi, { items }).pipe(
      map((response) => {
        const updatedItems = response.data.cart.items;
        const updatedCartData: Record<string, number> = {};
        updatedItems.forEach((item) => {
          updatedCartData[item.product.id] = item.count;
        });
        this.#cart.set(updatedCartData);
      }),
    );
  }
}
