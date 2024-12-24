import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class GeneralContainerComponent extends Component {
  @service('shopping-cart') cart;

  get itemCount() {
    return this.cart.itemList.reduce((total, item) => {
      return (total += item.count);
    }, 0);
  }
}
