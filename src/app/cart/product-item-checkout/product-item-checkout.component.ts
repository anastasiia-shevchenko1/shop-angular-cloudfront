import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { ProductCheckout } from '../../products/product.interface';
import { CartCountControlsComponent } from '../../core/cart-count-controls/cart-count-controls.component';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { CartService } from "../cart.service";

@Component({
  selector: 'app-product-item-checkout',
  templateUrl: './product-item-checkout.component.html',
  styleUrls: ['./product-item-checkout.component.scss'],
  standalone: true,
  imports: [MatCard, CartCountControlsComponent, DecimalPipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemCheckoutComponent {
  product = input.required<ProductCheckout>();
  hideControls = input(false);

  add = output();
  remove = output();

  #cartService = inject(CartService);

  countInCart = computed(() => {
    const cart = this.#cartService.cart();

    if (!(this.product().id in cart)) {
      return 0;
    }

    return cart[this.product().id];
  });
}
