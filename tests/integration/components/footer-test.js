import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-tutorial/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | footer', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Footer />`);
    assert.dom('[display-test-footerbrand]').hasText('© 2024 VaultX, Inc');
  });
});
