import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-tutorial/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | product', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('product', {
      id: '2',
      name: 'Nike Air Force 1',
      description:
        'Debuting in 1982, the AF1 was the first basketball shoe to house Nike Air, revolutionizing the game while rapidly gaining traction around the world.',
      price: {
        original: 109.95,
        current: 89.98,
      },
      features: [
        'Full-grain leather in the upper adds a premium look and feel.',
        'Originally designed for performance hoops, Nike Air cushioning adds lightweight, all-day comfort.',
        'The padded, low-cut collar looks sleek and feels great.',
      ],
      colors: [
        {
          color: 'white',
          image: '/assets/images/nike-af1-white.png',
        },
      ],
    });

    await render(hbs`<Product @product={{this.product}}/>`);
    assert.dom('[data-test-product="2"]').isVisible();
  });
});
