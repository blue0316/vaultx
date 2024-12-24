import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CartController extends Controller {
  @service('shopping-cart') cart;
  get subtotal() {
    return this.cart.itemList.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0);
  }
  get tax() {
    return 0.13 * this.subtotal;
  }
  get total() {
    return this.subtotal + this.tax;
  }

  @action updateItemCount(item, event) {
    const count = event.target.value;
    if (count >= 0) {
      item.count = count;
    } else {
      item.count = 0;
    }
  }

  @action checkout() {
    const successAlert = document.querySelector('#success-alert');
    const errorAlert = document.querySelector('#error-alert');
    const products = document.querySelectorAll(
      '.cart-item.d-flex.align-items-center.card.product-description',
    );
    if (products.length > 0) {
      errorAlert.style.display = 'none';
      successAlert.style.display = 'block';
      successAlert.innerHTML =
        'Success! Your order has been placed and will be delivered within 2-4 weeks!';
    } else {
      successAlert.style.display = 'none';
      errorAlert.style.display = 'block';
      errorAlert.innerHTML = 'Cannot checkout with empty shopping cart!';
    }
  }
}
